import express from "express"

import adminroute from "./admin-routes.js"
import imageroute from "./image-routes.js"
import doctoroute from "./doctor-routes.js"
import patientroute from "./patient-routes.js"




const router=express.Router()

router.use(adminroute)
router.use(imageroute)
router.use(doctoroute)
router.use(patientroute)



export default router