import { get, request } from '@/service/base'
import { paths } from '@/service/path-map'

export const getIndexData = params => get(paths.indexData, params)