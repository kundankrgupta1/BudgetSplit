import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createGroup, joinGroup, getMembers, getSettlement, getGroup, getUserGroups } from '../controller/group.controller.js';
const groupRouter = express.Router();



groupRouter.post('/create', protect, createGroup);
groupRouter.get('/:groupId', protect, getGroup);
groupRouter.get('/', protect, getUserGroups);
groupRouter.post('/join/:inviteCode', protect, joinGroup);
groupRouter.get('/:groupId/members', protect, getMembers);
groupRouter.get('/:groupId/settlement', protect, getSettlement);

export default groupRouter;

