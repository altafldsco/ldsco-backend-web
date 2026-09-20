import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { PlanDesign, PlanDesignRelated } from '../../db/models';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { HttpError } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.put(
  '/:id/related',
  authorize('plan_designs', 'update'),
  body('relatedPlanDesignIds').isArray(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Invalid payload', errors.array());

      const plan = await PlanDesign.findByPk(String(req.params.id));
      if (!plan) throw new HttpError(404, 'Plan design not found');

      const { relatedPlanDesignIds } = req.body as { relatedPlanDesignIds: number[] };
      await PlanDesignRelated.destroy({ where: { planDesignId: plan.id } });
      await PlanDesignRelated.bulkCreate(
        relatedPlanDesignIds
          .filter((id) => id !== plan.id)
          .map((relatedPlanDesignId) => ({ planDesignId: plan.id, relatedPlanDesignId }))
      );

      const updated = await PlanDesign.findByPk(plan.id, { include: [{ association: 'relatedPlans' }] });
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
