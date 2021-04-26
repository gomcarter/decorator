import { cache } from '@/utils/cache'

const USER_INFO = 'user_info'

export function token() {
  const user = cache.get(USER_INFO)
  return user ? user.token : undefined
}

export function id() {
  const user = cache.get(USER_INFO)
  return user ? user.id : undefined
}

export function name() {
  const user = cache.get(USER_INFO)
  return user ? user.name : 'nobody'
}

export function storeName() {
  const user = cache.get(USER_INFO)
  return user ? user.storeName : 'nobody'
}

export function storeId() {
  const user = cache.get(USER_INFO)
  return user ? user.storeId : undefined
}

export function login(user) {
  return cache.set(USER_INFO, user)
}

export function logout() {
  return cache.clear(USER_INFO)
}
