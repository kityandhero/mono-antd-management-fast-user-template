import { request } from 'easy-soft-utility';

export const uploadImageDataApiAddress = '/uploadHistory/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const uploadVideoDataApiAddress = '/uploadHistory/uploadVideo';

export async function uploadVideoData(parameters) {
  return request({
    api: uploadVideoDataApiAddress,
    params: parameters,
  });
}

export const uploadAudioDataApiAddress = '/uploadHistory/uploadAudio';

export async function uploadAudioData(parameters) {
  return request({
    api: uploadAudioDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress = '/uploadHistory/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}
