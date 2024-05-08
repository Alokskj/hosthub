import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import ProjectModel from '../models/project.model';
import { ApiError } from '../utils/ApiError';
import _config from '../config/_config';
import { ApiResponse } from '../utils/ApiResponse';

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { gitURL, name } = req.body;
        const isProjectExists = await ProjectModel.findOne({ name });
        if (isProjectExists) {
            throw new ApiError(400, 'This name is already taken.');
        }
        const project = await ProjectModel.create({
            name,
            gitURL,
            subDomain: `${name}.${_config.proxyServerDomain}`,
        });
        res.status(201).json(new ApiResponse(201, project));
    },
);
