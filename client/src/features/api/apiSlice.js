import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_TAGS } from "../../constants/api_tags";

export const apiSlice = createApi({
  reducerpath: "apiSlice",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: Object.values(API_TAGS),

  endpoints: (builder) => ({
    getFileLink: builder.query({
      query: (data) => `AdvancedFile/${data.fileName}`,
      responseHandler: (response) => console.log(response.blob()),
    }),
    downloadFile: builder.query({
      query: (data) => ({
        url: `AdvancedFile/download/${data.fileName}`,
      }),
      providesTags: [API_TAGS.FILE],
    }),


    getUserRoles: builder.query({
      query: () => `auth/roles`,
      providesTags: [API_TAGS.USER_ROLE],
    }),
    getOneUser: builder.query({
      query: (id) => `auth/${id}`,
      providesTags: [API_TAGS.USER_ROLE],
    }),
    getUsersByUserRole: builder.query({
      query: (id) => `Users/ByRoleId/${id}`,
      providesTags: [API_TAGS.USERS],
    }),
    createUserRole: builder.mutation({
      query: (data) => ({
        url: `role/${data}`,
        method: "POST"
      }),
      invalidatesTags: [API_TAGS.USER_ROLE],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "auth/set-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER_ROLE],
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `role`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER_ROLE],
    }),
    updateUserPermission: builder.mutation({
      query: (data) => ({
        url: `role/permissions`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER_ROLE],
    }),
    deleteUserRole: builder.mutation({
      query: (id) => ({
        url: `UserRoles/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: [API_TAGS.USER_ROLE],
    }),
    deactivateUser: builder.mutation({
      query: (id) => ({
        url: `auth/activate/${id}`,
        method: "PUT",
        body: id,
      }),
      invalidatesTags: [API_TAGS.USER_ROLE],
    }),
    resetUser: builder.mutation({
      query: (id) => ({
        url: `auth/reset/${id}`,
        method: "PUT",
        body: id,
      }),
      invalidatesTags: [API_TAGS.USER_ROLE],
    }),

    getAllUsers: builder.query({
      query: (id) => `auth/users`,
      providesTags: [API_TAGS.USER_ROLE],
    }),

    getDepartments: builder.query({
      query: (id) => `Departments/ByBranchId/${id}`,
      providesTags: [API_TAGS.DEPARTMENTS],
    }),
    getAllDepartments: builder.query({
      query: () => `department`,
      providesTags: [API_TAGS.DEPARTMENTS],
    }),
    getAllPermissions: builder.query({
      query: () => `role/authorities`,
      providesTags: [API_TAGS.DEPARTMENTS],
    }),
    createDepartment: builder.mutation({
      query: (data) => ({
        url: "department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.DEPARTMENTS],
    }),
    updateDepartment: builder.mutation({
      query: (data) => ({
        url: `department`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.DEPARTMENTS],
    }),
    updateDepartmentUsers: builder.mutation({
      query: (data) => ({
        url: `department/user`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.DEPARTMENTS],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `department/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: [API_TAGS.DEPARTMENTS],
    }),

    getUsersforChat: builder.query({
      query: (id) => `mail/user/${id}`,
      providesTags: [API_TAGS.USERS],
    }),

    ///////////
    getConversationsforChat: builder.query({
      query: (id) => `mail/conversations/${id}`,
      providesTags: [API_TAGS.USERS],
    }),
    getChatThread: builder.query({
      query: ({ senderId, receiverId }) =>
        `mail/thread/${senderId}/${receiverId}`,
      providesTags: [API_TAGS.USERS],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `mail/mail`,
        method: "POST",
        body: data,
      }),
    }),
    ///////////
    uploadFile: builder.mutation({
      query: (data) => ({
        url: "file",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.FILE],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.FILE],
    }),

    //NOTIFICATION
    getNotifications: builder.query({
      query: (data) => ({ url: `notifications/${data?.userId}`, params: data }),
      providesTags: [API_TAGS.NOTIFICATIONS],
    }),
    clearNotification: builder.mutation({
      query: (data) => ({
        url: `Notifications/clear/${data?.userId}`,
        method: "PUT",
      }),
      invalidatesTags: [API_TAGS.NOTIFICATIONS],
    }),

    //CHAPA
    getChapa: builder.query({
      query: (data) => `Chapa`,
      providesTags: [API_TAGS.CHAPA],
    }),
    addChapa: builder.mutation({
      query: (data) => ({
        url: `Chapa`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.CHAPA],
    }),
    getAllEmployees: builder.query({
      query: (id) => `employees`,
      providesTags: [API_TAGS.EMPLOYEE],
    }),
    getEmployees: builder.query({
      query: (id) => `employees/department/${id}`,
      providesTags: [API_TAGS.EMPLOYEE],
    }),
    getEmployee: builder.query({
      query: (id) => `employees/${id}`,
      providesTags: [API_TAGS.EMPLOYEE],
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.EMPLOYEE],
    }),
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `employees`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.EMPLOYEE],
    }),
    deleteEmployee: builder.mutation({
      query: (data) => ({
        url: `employees/${data.id}`,
        method: "DELETE",
        body: data.id,
      }),
      invalidatesTags: [API_TAGS.EMPLOYEE],
    }),
            // DOCUMENTATION
    //---------------------------------
    getDocumentation: builder.query({
      query: (data) => ({ url: `documentation` }),
      providesTags: [API_TAGS.DOCUMENTATION],
    }),
    getDocumentationById: builder.query({
      query: (id) => ({ url: `documentation/${id}` }),
      providesTags: [API_TAGS.DOCUMENTATION],
    }),
    createDocumentation: builder.mutation({
      query: (data) => ({
        url: `documentation`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.DOCUMENTATION],
    }),
    updateDocumentation: builder.mutation({
      query: (data) => ({
        url: `documentation`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.DOCUMENTATION],
    }),
    deleteDocumentation: builder.mutation({
      query: (data) => ({
        url: `documentation/${data}`,
        params: data,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.DOCUMENTATION],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFileLinkQuery,
  useDownloadFileQuery,
  useGetUserRolesQuery,
  useGetUsersByUserRoleQuery,
  useCreateUserRoleMutation,
  useUpdateUserRoleMutation,
  useDeleteUserRoleMutation,
  useGetDepartmentsQuery,
  useGetAllDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetNotificationsQuery,
  useClearNotificationMutation,
  useGetUsersforChatQuery,
  useGetConversationsforChatQuery,
  useGetChatThreadQuery,
  useSendMessageMutation,
  useGetChapaQuery,
  useAddChapaMutation,
  useDeactivateUserMutation,
  useResetUserMutation,
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useCreateUserMutation,
  useChangePasswordMutation,
  useUpdateDepartmentUsersMutation,
  useGetAllPermissionsQuery,
  useUpdateUserPermissionMutation,
  useGetEmployeesQuery,
  // useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
      // DOCUMENTATION
  //---------------------------------
  useGetDocumentationQuery,
  useGetDocumentationByIdQuery,
  useCreateDocumentationMutation,
  useUpdateDocumentationMutation,
  useDeleteDocumentationMutation,
} = apiSlice;
