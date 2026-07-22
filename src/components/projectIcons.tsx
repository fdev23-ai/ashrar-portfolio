import type { ComponentType } from 'react'
import { FiActivity, FiBluetooth, FiDatabase, FiGlobe, FiHeart, FiShoppingCart, FiSmartphone, FiSmile, FiSun } from 'react-icons/fi'
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
  plant: FaLeaf,
  heartbeat: FiHeart,
}
