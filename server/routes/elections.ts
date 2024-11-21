import express from "express";
const router = express.Router();

import {
    createElection,
    getAllElections,
    getElectionById,
    updateElection,
    deleteElection,

    createCommitteepost,
    getAllCommitteeposts,
    getCommitteepostById,
    updateCommitteepost,
    deleteCommitteepost,

    createCommitteeMember,
    getAllCommitteeMembers,
    getCommitteeMemberById,
    updateCommitteeMember,
    deleteCommitteeMember,

    getCommitteeMembersByElectionId
  } from "../controllers/elections";
  import { validateBearerToken } from "../middlewares/validateBearerToken";
  router.route("/newelection/create").post(validateBearerToken , createElection);
  router.route("/newelection/:electionid").get(getElectionById);
  router.route("/newelection").get(getAllElections);
  router.route("/newelection/:electionid").put(validateBearerToken, updateElection);
  router.route("/newelection/:electionid").delete(validateBearerToken, deleteElection);

  router.route("/positions/create").post(validateBearerToken, createCommitteepost);
  router.route("/positions/:committeepostid").get(getCommitteepostById);
  router.route("/positions").get(getAllCommitteeposts);
  router.route("/positions/:committeepostid").put(validateBearerToken , updateCommitteepost);
  router.route("/positions/:committeepostid").delete(validateBearerToken, deleteCommitteepost);

  router.route("/members/create").post(validateBearerToken, createCommitteeMember);
  router.route("/members/:committeeid").get(getCommitteeMemberById);
  router.route("/members").get(getAllCommitteeMembers);
  router.route("/members/:committeeid").put(validateBearerToken , updateCommitteeMember);
  router.route("/members/:committeeid").delete(validateBearerToken , deleteCommitteeMember);
  router.route("/allmembers/:electionid").get(getCommitteeMembersByElectionId);


  export default router;