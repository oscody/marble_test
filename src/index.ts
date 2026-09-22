/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { World } from '@iwsdk/core';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';
import projectOptions from 'virtual:iwsdk-project';
import { PanelSystem } from './panel.js';
import { RobotSystem } from './robot.js';

const assetUrl = (filePath: string): string =>
  `${import.meta.env.BASE_URL}${filePath.replace(/^\/+/, '')}`;

async function start(): Promise<void> {
  const world = await World.create(
    document.getElementById('scene-container') as HTMLDivElement,
    projectOptions,
  );

  // Spark shares IWSDK's renderer and is registered as an IWSDK entity so its
  // transform and lifecycle remain under World management.
  const spark = new SparkRenderer({ renderer: world.renderer });
  world.createTransformEntity(spark);

  const marbleWorld = new SplatMesh({
    url: assetUrl('/splats/mmm.spz'),
  });
  await marbleWorld.initialized;
  marbleWorld.position.set(0, 0, 0);
  marbleWorld.scale.setScalar(1);
  world.createTransformEntity(marbleWorld);

  world.registerSystem(RobotSystem);
  world.registerSystem(PanelSystem);
}

void start();
