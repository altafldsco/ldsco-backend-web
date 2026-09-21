import { Router, Request, Response, NextFunction } from 'express';
import { ModelStatic, Model, Op, Order, Includeable } from 'sequelize';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { HttpError } from '../middleware/errorHandler';

export interface CrudOptions {
  resource: string;
  defaultOrder?: Order;
  filterableFields?: string[];
  searchableFields?: string[];
  include?: Includeable[];
  hasPublishFlag?: boolean; // defaults to true; set false for models without is_published
  slugField?: string; // when set, the public single-record route also accepts a slug in place of id
}

const AUDIT_KEYS = ['id', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'];

function stripAuditFields<T extends Record<string, any>>(body: T) {
  const clean = { ...body };
  for (const key of AUDIT_KEYS) delete clean[key];
  return clean;
}

function buildQueryOptions(model: ModelStatic<Model>, req: Request, opts: CrudOptions, extraWhere: Record<string, any>) {
  const where: Record<string, any> = { ...extraWhere };

  for (const field of opts.filterableFields || []) {
    const value = req.query[field];
    if (value !== undefined) where[field] = value;
  }

  if (opts.searchableFields?.length && req.query.q) {
    const term = `%${req.query.q}%`;
    (where as any)[Op.or] = opts.searchableFields.map((f) => ({ [f]: { [Op.like]: term } }));
  }

  const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(String(req.query.pageSize ?? '50'), 10) || 50));

  const defaultOrder = opts.defaultOrder ?? ([['sortOrder', 'ASC'], ['id', 'ASC']] as Order);
  const sortBy = String(req.query.sortBy ?? '');
  const sortDir = String(req.query.sortDir ?? 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  // Only allow sorting by a real column on this model — sortBy is client-controlled,
  // and an unknown identifier would otherwise surface as a raw DB error.
  const order: Order = sortBy && Object.keys(model.getAttributes()).includes(sortBy)
    ? [[sortBy, sortDir]]
    : defaultOrder;

  return {
    where,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order,
    include: opts.include,
    page,
    pageSize,
  };
}

async function loadOr404(model: ModelStatic<Model>, id: string | string[], include?: Includeable[]) {
  const record = await model.findByPk(Array.isArray(id) ? id[0] : id, { include });
  if (!record) throw new HttpError(404, `${model.name} not found`);
  return record;
}

/**
 * Full CRUD router for the admin API: requires a JWT and the
 * resource:action permission for every route, sees all rows
 * (published and unpublished).
 */
export function buildAdminCrudRouter(model: ModelStatic<Model>, opts: CrudOptions): Router {
  const router = Router();
  router.use(authenticate);

  router.get('/', authorize(opts.resource, 'read'), async (req, res, next) => {
    try {
      const { where, limit, offset, order, include, page, pageSize } = buildQueryOptions(model, req, opts, {});
      const { rows, count } = await model.findAndCountAll({ where, limit, offset, order, include, distinct: true });
      res.json({ data: rows, meta: { page, pageSize, total: count } });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', authorize(opts.resource, 'read'), async (req, res, next) => {
    try {
      const record = await loadOr404(model, req.params.id, opts.include);
      res.json({ data: record });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', authorize(opts.resource, 'create'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const record = await model.create(stripAuditFields(req.body), { userId: req.user!.id } as any);
      res.status(201).json({ data: record });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', authorize(opts.resource, 'update'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const record = await loadOr404(model, req.params.id);
      await record.update(stripAuditFields(req.body), { userId: req.user!.id } as any);
      res.json({ data: record });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', authorize(opts.resource, 'delete'), async (req, res, next) => {
    try {
      const record = await loadOr404(model, req.params.id);
      await record.destroy();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
}

/**
 * Read-only router for the public site: no auth, restricted to
 * published rows only (unless the model has no publish flag).
 */
export function buildPublicReadRouter(model: ModelStatic<Model>, opts: CrudOptions): Router {
  const router = Router();
  const publishWhere = opts.hasPublishFlag === false ? {} : { isPublished: true };

  router.get('/', async (req, res, next) => {
    try {
      const { where, limit, offset, order, include, page, pageSize } = buildQueryOptions(model, req, opts, publishWhere);
      const { rows, count } = await model.findAndCountAll({ where, limit, offset, order, include, distinct: true });
      res.json({ data: rows, meta: { page, pageSize, total: count } });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:idOrSlug', async (req, res, next) => {
    try {
      const idOrSlug = Array.isArray(req.params.idOrSlug) ? req.params.idOrSlug[0] : req.params.idOrSlug;
      const isNumeric = /^\d+$/.test(idOrSlug);
      const lookup = isNumeric || !opts.slugField ? { id: idOrSlug } : { [opts.slugField]: idOrSlug };
      const record = await model.findOne({
        where: { ...lookup, ...publishWhere },
        include: opts.include,
      });
      if (!record) throw new HttpError(404, `${model.name} not found`);
      res.json({ data: record });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
