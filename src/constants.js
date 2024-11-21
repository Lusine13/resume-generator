export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const ROUTE_CONSTANTS  = {
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  EDUCATION: '/education',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  SOCIAL: '/social',  
  
}

export const FIRESTORE_PATH_NAMES = {
  REGISTERED_USERS: 'registered_users', 
}

export const STORAGE_PATH_NAMES = {
  PROFILE_IMAGES: 'profile_images'
}