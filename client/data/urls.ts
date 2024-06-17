export const BACKENDURL: string = "http://localhost:5050/";

export const APIENDPOINTS = {
  auth: {
    login: `${BACKENDURL}auth/login`,
    createMultiuser: `${BACKENDURL}auth/multiUserCreate`,
    updatePassword: `${BACKENDURL}auth/updatePassword`,
    changePassword: `${BACKENDURL}auth/changePassword`,
  },
  users: {
    getAllUsers: `${BACKENDURL}users`,
    updateUserbyID: `${BACKENDURL}users`,
    getUserbyID: `${BACKENDURL}users`,
    DelUserbyID: `${BACKENDURL}users`,
  },
  notice: {
    getAllNotice: `${BACKENDURL}notice`,
    createNotice: `${BACKENDURL}notice/create`,
    updateNotice: `${BACKENDURL}notice/`,
    getNoticebyID: `${BACKENDURL}notice`,
    delNoticebyID: `${BACKENDURL}notice`,
  },
  skill: {
    createSkill: `${BACKENDURL}skills/create`,
    updateSkillbyID: `${BACKENDURL}skills`,
    deleteSkillbyID: `${BACKENDURL}skills`,
    getAllSkill: `${BACKENDURL}skills`,
  },
  userSkill: {
    getUserAllSkill: `${BACKENDURL}skills/user`,
    addUserSkill: `${BACKENDURL}skills/user/create`,
    updateUserSkill: `${BACKENDURL}skills/user`,
    deleteUserSkill: `${BACKENDURL}skills/user`,
  },
  team: {
    createTeam: `${BACKENDURL}achievement/team/create`,
    updateTeam: `${BACKENDURL}achievement/team`,
    deleteTeam: `${BACKENDURL}achievement/team`,
    getAllTeam: `${BACKENDURL}achievement/team`,
    addMember: `${BACKENDURL}achievement/member/create`,
    getMemberbyID: `${BACKENDURL}achievement/member`,
    getAllMember: `${BACKENDURL}achievement/member`,
    deleteMember: `${BACKENDURL}achievement/member`,
  },
  achievement: {
    createAchievement: `${BACKENDURL}achievement/post/create`,
    updateAchievement: `${BACKENDURL}achievement/post`,
    deleteAchievement: `${BACKENDURL}achievement/post`,
    getAllAchievement: `${BACKENDURL}achievement/post`,
    getAchievementbyID: `${BACKENDURL}achievement/post`,
  },
  blogs: {
    createBlog: `${BACKENDURL}blog/create`,
    updateBlog: `${BACKENDURL}blog`,
    deleteBlog: `${BACKENDURL}blog`,
    getAllBlog: `${BACKENDURL}blog`,
    getBlogbyID: `${BACKENDURL}blog`,
  },
  election: {
    createElection: `${BACKENDURL}election/newelection/create`,
    deleteElection: `${BACKENDURL}election/newelection`,
    getAllElection: `${BACKENDURL}election/newelection`,
    getElectionbyID: `${BACKENDURL}election/newelection`,
    createPosition: `${BACKENDURL}election/positions/create`,
    getAllPosition: `${BACKENDURL}election/positions`,
    getPositionbyID: `${BACKENDURL}election/positions`,
    deletePosition: `${BACKENDURL}election/positions`,
  },
};
