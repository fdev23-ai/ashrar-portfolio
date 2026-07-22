import type { ComponentType } from 'react'
import { FiActivity, FiBluetooth, FiDatabase, FiGlobe, FiHeart, FiShoppingCart, FiSmartphone, FiSmile, FiSun, FiUser } from 'react-icons/fi'
import { FaLeaf } from 'react-icons/fa'
import type { ProjectIcon } from '../data/resume'

export const projectIcons: Record<ProjectIcon, ComponentType<{ size?: number }>> = {
  bluetooth: FiBluetooth,
  health: FiActivity,
  pos: FiShoppingCart,
  web: FiGlobe,
  apps: FiSmartphone,
  database: FiDatabase,
  crop: FiSun,
  emotion: FiSmile,
  face: FiUser,
  plant: FaLeaf,
  heartbeat: FiHeart,
}
