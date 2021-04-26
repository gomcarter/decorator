import { cache } from '@/utils/cache'

export const MENU = [
  {
    id: 1,
    name: '工作台',
    link: 'workbench'
  }]

const key = '__accessible_menu__'
export const setAccessibleMenuList = (accessRoutes) => {
  const accessRoutesMap = {}
  accessRoutes.forEach(v => {
    accessRoutesMap[v.path] = v
  })
  cache.set(key, accessRoutesMap, true)
}

export const getAccessibleMenuMap = () => {
  return cache.get(key, true)
}

