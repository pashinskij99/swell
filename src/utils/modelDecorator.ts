/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
import React from 'react';
import * as THREE from 'three';

// const CONFIG_EXAMPLE = [
//   {
//     mesh: 'MESH_NAME',
//     material: 'MeshBasicMaterial',
//     material_params: {
//       color: 0xfff000,
//     },
//     material_properties: {},
//     mesh_properties: {},

//     mesh_transform: {
//       rotation: [0, 0, 0],
//       position: [0, 0, 0],
//       scale: [0, 0, 0],
//     },

//     textures: [
//       {
//         type: 'map',
//         url: './assets/images/360.jpg',
//         texture_properties: {
//           encoding: 3001,
//         },
//         texture_params: {
//           repeat: [2, 2],
//         },
//       },

//       //video
        // {
        //   type: 'map',
        //   url: './vid/vid.mp4',
        //   texture_properties: {
        //     color: 0xff0000,
        //   },
        //   texture_params: {
        //     type: 'video',
        //   },
        // },
//     ],
//   },
// ]

const FROM_MESH_STRING = '[MESH]=';

const FROM_MESH_REGEX = /^\[MESH\]=/;

export interface IDecorateConfigMeshTexture {
  type: string
  url: string | null,
  fromType?: string
  texture_properties?: any
  texture_params?: {
    [x: string]: any
    flip?: boolean
    repeat?: [number, number]
  }
}

export interface IDecorateConfigMesh {
  mesh: string | 'any' | (string | 'any')[]
  material?: string
  material_params?: any
  material_properties?: any
  mesh_properties?: any

  mesh_transform?: {
    rotation?: [number, number, number]
    position?: [number, number, number]
    scale?: [number, number, number]
  }

  textures?: IDecorateConfigMeshTexture[]
}

interface CompresedConfigMesh extends IDecorateConfigMesh {
  mesh: string | 'any' | 'MAIN_MESH'
}

export type IDecorateConfig = IDecorateConfigMesh[];
type CompresedConfig = CompresedConfigMesh[];

class ModelDecorator extends THREE.EventDispatcher {
  textureLoader = new THREE.TextureLoader();

  textureCache: { [key: string]: THREE.Texture } = {};

  async decorate(config: IDecorateConfig, model: THREE.Object3D): Promise<void> {
    const compresedConfig: CompresedConfig = config
      .reduce((acc: any, item) => {
        if (Array.isArray(item.mesh)) {
          acc.push(item.mesh.map((mesh) => ({ ...item, mesh })));
        } else {
          acc.push(item);
        }

        return acc;
      }, [])
      .flat(2);

    const promises: Promise<any>[] = [];

    model.traverse((child) => {
      try {
        const decorations = compresedConfig.filter((i) => ['any', child.name].includes(i.mesh));

        const decorationByRegexp = compresedConfig.filter((i) => {
          const regEx = new RegExp(i.mesh);

          return regEx.test(child.name);
        });
        [...decorations, ...decorationByRegexp].forEach((targetConfig) => {
          const object = child as THREE.Mesh;

          if (!object) {
            return null;
          }

          try {
            const {
              material,
              mesh_transform,
              material_params = {},
              material_properties = {},
              mesh_properties = {},
              textures,
            } = targetConfig;

            const isMesh = object instanceof THREE.Mesh;

            if (material && isMesh) {
              if (!(object instanceof THREE.Mesh)) {
                return null;
              }

              // @ts-ignore
              const _material = new THREE[material](material_params) as THREE.Material;

              object.material = _material;
            }

            if (textures && isMesh) {
              if (!(object instanceof THREE.Mesh)) {
                return null;
              }
              textures.forEach((texture): void => {
                const {
                  url,
                  type,
                  fromType,
                  texture_properties = {},
                  texture_params = {},
                } = texture;

                const chachedTexture = url ? this.textureCache[url] : undefined;

                let _texture: THREE.Texture | undefined | null;

                if (url && FROM_MESH_REGEX.test(url)) {
                  const targetMesh = model.getObjectByName(
                    url.replace(FROM_MESH_STRING, ''),
                  ) as THREE.Mesh;

                  if (targetMesh && fromType) {
                    const material = targetMesh.material as THREE.Material;

                    // @ts-ignore
                    const texture = material[fromType] as THREE.Texture;

                    _texture = texture.clone();

                    _texture.needsUpdate = true;
                  } else if (!fromType) {
                    throw new Error(
                      `'fromType' is missed in [${url}] texture decoration`,
                    );
                  } else if (!targetMesh) {
                    throw new Error(
                      `mesh [${url.replace(
                        FROM_MESH_STRING,
                        '',
                      )}] not founded in decorate model`,
                    );
                  }
                } else if (url === null) {
                  _texture = url;
                } else if (chachedTexture && texture_params.type !== 'video') {
                  _texture = chachedTexture;

                  _texture.encoding = THREE.sRGBEncoding;
                } else if (texture_params.type === 'video') {
                  const vid = `<video src="${url}" loop="true" id='${url}'/>`;
                  const elem = document.createElement('div');
                  elem.innerHTML = vid;

                  _texture = new THREE.VideoTexture(elem.firstChild! as HTMLVideoElement);

                  this.textureCache[url] = _texture;
                } else {
                  const promise = new Promise((resolve) => {
                    _texture = this.textureLoader.load(url, resolve, undefined, (e) => {
                      console.error('ERROR LOADING', e, url);
                      resolve(undefined);
                    });

                    _texture.encoding = THREE.sRGBEncoding;

                    this.textureCache[url] = _texture;
                  });
                  promises.push(promise);
                }

                if (_texture === undefined) {
                  return;
                }

                const material = object.material as THREE.Material;

                if (_texture && texture_params.repeat) {
                  if (chachedTexture) {
                    const t = _texture.clone();

                    _texture = t;
                  }
                  _texture.repeat.fromArray(texture_params.repeat);
                }

                // _texture.flipY = false
                // _texture.needsUpdate = true

                // if (texture_params.flip) {
                // _texture.wrapS = THREE.RepeatWrapping
                // _texture.repeat. = -1
                // _texture.repeat.x = - 1
                // }

                if (_texture) {
                  Object.assign(_texture, texture_properties);
                }

                if (material) {
                  // @ts-ignore
                  material[type] = _texture;
                  material.needsUpdate = true;
                }
              });
            }

            const { rotation, position, scale } = mesh_transform || {};

            if (rotation) {
              object.rotation.fromArray(rotation);
            }

            if (position) {
              object.position.fromArray(position);
            }

            if (scale) {
              object.scale.fromArray(scale);
            }

            if (object.material && isMesh) {
              if (material_properties) {
                const properties = { ...material_properties };

                if (properties.color) {
                  (object.material as any).color.set(properties.color);
                  delete properties.color;
                }
                if (properties.emissive) {
                  (object.material as any).emissive.set(properties.emissive);
                  delete properties.emissive;
                }

                Object.assign(object.material, properties);
              }
              // @ts-ignore
              object.material.needsUpdate = true;
            }

            Object.assign(object, mesh_properties);
          } catch (error) {
            console.error(`[${object.name}] ${error}`);
          }
          return undefined;
        });
      } catch (e) {
        console.error(e);
      }
    });

    return await Promise.all(promises) as any;
  }
}

const decoratorInstance = new ModelDecorator();

const useModelDecorator = (config: IDecorateConfig, model: THREE.Object3D) => {
  React.useEffect(() => {
    decoratorInstance.decorate(config, model);
  }, [model, config]);
};

export { useModelDecorator, ModelDecorator };
