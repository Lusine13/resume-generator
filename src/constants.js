export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const percValidation = /^[0-9]+(\.[0-9]{1,2})?$/;
export const yearValidation = /^\d{4}$/;

export const ROUTE_CONSTANTS  = {
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/resume/profile',
  EDUCATION: '/resume/education',
  PROJECTS: '/resume/projects',
  SKILLS: '/resume/skills',
  SOCIAL: '/resume/social',  
  
}

export const FIRESTORE_PATH_NAMES = {
  REGISTERED_USERS: 'registered_users', 
}
export const STORAGE_PATH_NAMES = {
  PROFILE_IMAGES: 'profile_images'
}