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
    deleteCommitteeMember
  } from "../controllers/elections";

  router.route("/newelection/create").post(createElection);
  router.route("/newelection/:electionid").get(getElectionById);
  router.route("/newelection").get(getAllElections);
  router.route("/newelection/:electionid").put(updateElection);
  router.route("/newelection/:electionid").delete(deleteElection);

  router.route("/positions/create").post(createCommitteepost);
  router.route("/positions/:committeepostid").get(getCommitteepostById);
  router.route("/positions").get(getAllCommitteeposts);
  router.route("/positions/:committeepostid").put(updateCommitteepost);
  router.route("/positions/:committeepostid").delete(deleteCommitteepost);

  router.route("/members/create").post(createCommitteeMember);
  router.route("/members/:committeeid").get(getCommitteeMemberById);
  router.route("/members").get(getAllCommitteeMembers);
  router.route("/members/:committeeid").put(updateCommitteeMember);
  router.route("/members/:committeeid").delete(deleteCommitteeMember);


  export default router;