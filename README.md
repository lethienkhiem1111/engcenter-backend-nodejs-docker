# ENGLISH CENTER APP

## Bussiness

### User Stories

The Roles include: Admin, Staff, Teacher, Parent, Student, User
Admin can list all user, get any user, get all user

User can register new account, sign in, get user, change password, delete user
User can create profile, get profile, edit profile, delete profile
...

## Analyse

### Build APIs (Restfull API)

#### User

- Create User (`/api/user/createUser`)
- Get User (`/api/user/`) => (response: { user, { include: Profile } })
- Get All User (`/api/user/getAllUsers`)
- Delete User (`/api/user/deleteUser\:userId`)
- Change password (`/api/user/editPassword`)

#### Profile

- Create Profile (`/api/user/createProfile/:userId`)
- Get Profile (`/api/user/getProfile/:userId`)
- Edit Profile (`/api/user/editProfile/:profileId`)
- Delete Profile (`/api/user/deleteProfile/:profileId`)

#### Level

- Create Level (`/api/level/createLevel`)
- Get Level (`/api/level/getLevel/:levelId`)
- Get All Level (`/api/level/getAllLevels`)
- Delete Level (`/api/level/deleteLevel/:levelId`)

#### Catagory

- Create Catagory (`/api/catagory/createCatagory`)
- Get Catagory (`/api/catagory/getCatagory/:catagoryId`)
- Get All Catagory (`/api/catagory/getAllCatagories`)
- Delete Catagory (`/api/catagory/deleteCatagory/:catagoryId`)

#### Course

#### Class

#### Outline

#### Schedule

#### Introduction

#### Score

#### Contact

#### Enrollment


- Create Todo (Create single toto for each time) (`/api/createTodo`)
- Update Todo & Mark this todo as complete (`/api/updateTodo`)
- Get All Todo (`/api/todos`)
- Get All completed todos (`/api/todos`, params: `completed: true`)
- Get All activated todos (`/api/todos`, params: `completed: false`)
- Delete Todo by Id (`/api/deleteTodo`)
- Clear completed todos | clear all (`/api/clearCompleted`) (params: `completed: true | ''`)

### Database
- Dialect Mysql
- Database name: engcenter
<image src="https://user-images.githubusercontent.com/39824030/81814075-7c179a80-9552-11ea-83df-d7b3b9719383.png"/>
> All api are accept JSON body, response JSON
