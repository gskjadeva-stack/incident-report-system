const API_URL = process.env.API_URL ?? "https://ir-incident-api.onrender.com";

const seedTag = "SYNTHETIC-CEMENT-TRUCKING-SEED-2026-05-10";

const incidents = [
  {
    reportedByName: "Dispatch Coordinator A",
    reporterPosition: "Dispatch Coordinator",
    reporterDepartment: "Hauling Operations",
    reporterSite: "Cement Dispatch Yard",
    reportDate: "2026-05-01",
    reportTime: "08:25",
    classification: "VEHICULAR_ACCIDENT",
    incidentSite: "Plant Gate 2",
    incidentArea: "Outbound Weighbridge Lane",
    incidentDate: "2026-05-01",
    incidentTime: "07:50",
    description:
      `${seedTag} | During outbound dispatch for a bulk cement hauling trip, Truck Unit CT-018 made light contact with a gate bollard while queueing near the weighbridge. No injury was reported. Minor scratch damage was observed on the front bumper and bollard paint.`,
    immediateActionTaken:
      "Truck was held at the dispatch lane for inspection. Yard marshal redirected the queue and documented photos before release decision.",
    reportTakenByName: "Operations Supervisor A",
    reportTakenByPosition: "Operations Supervisor",
    reportTakenDate: "2026-05-01",
    reportTakenTime: "09:05",
    impactHealthSafety: false,
    impactLegal: false,
    impactOperational: true,
    impactReputational: false,
    impactFinancial: true,
    impactOthers: false,
    impactDescription: "Temporary queue delay and minor property repair assessment.",
    recommendation:
      "Re-brief drivers on low-speed gate approach, use spotter assistance during peak dispatch, and repaint bollard visibility markings.",
    notedBy: "Transport Manager A",
    approvedBy: "Operations Manager A"
  },
  {
    reportedByName: "Warehouse Checker A",
    reporterPosition: "Warehouse Checker",
    reporterDepartment: "Trading Warehouse",
    reporterSite: "Bagged Cement Warehouse",
    reportDate: "2026-05-02",
    reportTime: "11:15",
    classification: "DAMAGE_TO_PROPERTY",
    incidentSite: "Trading Warehouse",
    incidentArea: "Loading Bay 3",
    incidentDate: "2026-05-02",
    incidentTime: "10:40",
    description:
      `${seedTag} | While staging bagged cement for a trading customer pickup, a pallet stack shifted during forklift positioning. Several bags were torn and loose cement spilled inside the loading bay.`,
    immediateActionTaken:
      "Loading was paused. Damaged bags were segregated, spill area was swept, and forklift operator was instructed to re-stage remaining pallets.",
    reportTakenByName: "Warehouse Supervisor A",
    reportTakenByPosition: "Warehouse Supervisor",
    reportTakenDate: "2026-05-02",
    reportTakenTime: "11:35",
    impactHealthSafety: true,
    impactLegal: false,
    impactOperational: true,
    impactReputational: false,
    impactFinancial: true,
    impactOthers: false,
    impactDescription: "Dust exposure potential, product loss, and loading delay.",
    recommendation:
      "Review pallet stacking height, require damaged pallet replacement before staging, and remind forklift operators to maintain fork level before lift.",
    notedBy: "Warehouse Manager A",
    approvedBy: "Operations Manager A"
  },
  {
    reportedByName: "Fleet Mechanic A",
    reporterPosition: "Fleet Mechanic",
    reporterDepartment: "Fleet Maintenance",
    reporterSite: "Motorpool",
    reportDate: "2026-05-03",
    reportTime: "14:10",
    classification: "SAFETY_VIOLATION",
    incidentSite: "Motorpool",
    incidentArea: "Preventive Maintenance Bay",
    incidentDate: "2026-05-03",
    incidentTime: "13:45",
    description:
      `${seedTag} | A driver entered the preventive maintenance bay without required PPE while mechanics were checking brake lines on a cement hauling tractor head.`,
    immediateActionTaken:
      "Driver was stopped and escorted out of the bay. Toolbox reminder was conducted before maintenance work resumed.",
    reportTakenByName: "Safety Officer A",
    reportTakenByPosition: "Safety Officer",
    reportTakenDate: "2026-05-03",
    reportTakenTime: "14:30",
    impactHealthSafety: true,
    impactLegal: false,
    impactOperational: false,
    impactReputational: false,
    impactFinancial: false,
    impactOthers: false,
    impactDescription: "Potential exposure to moving equipment and maintenance hazards.",
    recommendation:
      "Post clearer restricted-area signage, require visitor log-in at motorpool entrance, and include PPE compliance in driver dispatch reminders.",
    notedBy: "Fleet Supervisor A",
    approvedBy: "Safety Manager A"
  },
  {
    reportedByName: "Route Coordinator A",
    reporterPosition: "Route Coordinator",
    reporterDepartment: "Hauling Operations",
    reporterSite: "Dispatch Office",
    reportDate: "2026-05-04",
    reportTime: "16:20",
    classification: "OPERATIONAL_PROCEDURE",
    incidentSite: "Customer Delivery Route",
    incidentArea: "Checkpoint Before Customer Site",
    incidentDate: "2026-05-04",
    incidentTime: "15:55",
    description:
      `${seedTag} | A cement delivery truck proceeded to the customer site without confirming the updated delivery sequence issued by dispatch. The unit arrived before the receiving window and waited roadside.`,
    immediateActionTaken:
      "Dispatch contacted the driver and customer receiver. The truck was instructed to wait at the approved staging area until receiving window opened.",
    reportTakenByName: "Dispatch Supervisor A",
    reportTakenByPosition: "Dispatch Supervisor",
    reportTakenDate: "2026-05-04",
    reportTakenTime: "16:45",
    impactHealthSafety: false,
    impactLegal: false,
    impactOperational: true,
    impactReputational: true,
    impactFinancial: false,
    impactOthers: false,
    impactDescription: "Delivery waiting time and customer coordination concern.",
    recommendation:
      "Require driver acknowledgement of revised dispatch instructions through the dispatch log before gate-out clearance.",
    notedBy: "Transport Manager A",
    approvedBy: "Operations Manager A"
  },
  {
    reportedByName: "Inventory Checker A",
    reporterPosition: "Inventory Checker",
    reporterDepartment: "Trading Warehouse",
    reporterSite: "Bagged Cement Warehouse",
    reportDate: "2026-05-05",
    reportTime: "09:50",
    classification: "ATTEMPTED_THEFT_PILFERAGE",
    incidentSite: "Warehouse Perimeter",
    incidentArea: "Returned Empty Pallet Area",
    incidentDate: "2026-05-05",
    incidentTime: "09:20",
    description:
      `${seedTag} | During morning inventory checking, one torn cement bag was found hidden behind returned pallets near the warehouse perimeter. The item appeared to have been moved from the staging rack without authorization.`,
    immediateActionTaken:
      "Area was secured. Warehouse supervisor conducted a quick count reconciliation and instructed guards to review access log entries.",
    reportTakenByName: "Security Supervisor A",
    reportTakenByPosition: "Security Supervisor",
    reportTakenDate: "2026-05-05",
    reportTakenTime: "10:15",
    impactHealthSafety: false,
    impactLegal: true,
    impactOperational: true,
    impactReputational: false,
    impactFinancial: true,
    impactOthers: false,
    impactDescription: "Potential stock loss and inventory control concern.",
    recommendation:
      "Tighten perimeter checks, restrict pallet storage blind spots, and reconcile damaged-bag movement at every shift turnover.",
    notedBy: "Warehouse Manager A",
    approvedBy: "Operations Manager A"
  },
  {
    reportedByName: "Yard Marshal A",
    reporterPosition: "Yard Marshal",
    reporterDepartment: "Plant Yard Operations",
    reporterSite: "Cement Loading Yard",
    reportDate: "2026-05-06",
    reportTime: "13:05",
    classification: "ENVIRONMENT_CONCERN",
    incidentSite: "Cement Loading Yard",
    incidentArea: "Bulk Loading Silo 1",
    incidentDate: "2026-05-06",
    incidentTime: "12:35",
    description:
      `${seedTag} | Cement dust was observed escaping near the loading spout while a bulk tanker was being loaded. Dust settled around the immediate loading bay floor.`,
    immediateActionTaken:
      "Loading was temporarily stopped. Spout alignment was checked and the area was misted and cleaned before loading resumed.",
    reportTakenByName: "Safety Officer A",
    reportTakenByPosition: "Safety Officer",
    reportTakenDate: "2026-05-06",
    reportTakenTime: "13:25",
    impactHealthSafety: true,
    impactLegal: false,
    impactOperational: true,
    impactReputational: true,
    impactFinancial: false,
    impactOthers: false,
    impactDescription: "Dust exposure potential and housekeeping issue at loading bay.",
    recommendation:
      "Inspect loading spout seals before each shift and record dust-control housekeeping checks after every loading cycle.",
    notedBy: "Plant Yard Supervisor A",
    approvedBy: "Safety Manager A"
  },
  {
    reportedByName: "Billing Assistant A",
    reporterPosition: "Billing Assistant",
    reporterDepartment: "Trading Administration",
    reporterSite: "Trading Office",
    reportDate: "2026-05-07",
    reportTime: "15:30",
    classification: "OPERATIONAL_PROCEDURE",
    incidentSite: "Trading Office",
    incidentArea: "Document Processing Desk",
    incidentDate: "2026-05-07",
    incidentTime: "14:50",
    description:
      `${seedTag} | A hauling transaction delivery receipt was submitted with mismatched truck unit number versus the dispatch log. The discrepancy was identified before billing release.`,
    immediateActionTaken:
      "Billing was put on hold. Dispatch log, gate pass, and delivery receipt were cross-checked before correction.",
    reportTakenByName: "Admin Supervisor A",
    reportTakenByPosition: "Admin Supervisor",
    reportTakenDate: "2026-05-07",
    reportTakenTime: "15:55",
    impactHealthSafety: false,
    impactLegal: false,
    impactOperational: true,
    impactReputational: false,
    impactFinancial: true,
    impactOthers: false,
    impactDescription: "Billing delay and potential documentation error.",
    recommendation:
      "Use a three-way check between dispatch log, gate pass, and delivery receipt before billing encoding.",
    notedBy: "Finance Supervisor A",
    approvedBy: "Trading Manager A"
  },
  {
    reportedByName: "Security Guard A",
    reporterPosition: "Security Guard",
    reporterDepartment: "Security",
    reporterSite: "Plant Main Gate",
    reportDate: "2026-05-08",
    reportTime: "06:40",
    classification: "TRESPASSING",
    incidentSite: "Plant Main Gate",
    incidentArea: "Truck Queue Holding Area",
    incidentDate: "2026-05-08",
    incidentTime: "06:10",
    description:
      `${seedTag} | An unauthorized helper attempted to enter the truck queue holding area with a cement delivery driver before visitor verification was completed.`,
    immediateActionTaken:
      "Entry was denied. The helper was directed to the visitor processing area and the driver was reminded of gate access requirements.",
    reportTakenByName: "Security Supervisor A",
    reportTakenByPosition: "Security Supervisor",
    reportTakenDate: "2026-05-08",
    reportTakenTime: "07:00",
    impactHealthSafety: true,
    impactLegal: true,
    impactOperational: false,
    impactReputational: false,
    impactFinancial: false,
    impactOthers: false,
    impactDescription: "Unauthorized access risk in active truck movement area.",
    recommendation:
      "Require pre-registration of helpers and post gate reminders for driver-only access unless visitor clearance is approved.",
    notedBy: "Security Manager A",
    approvedBy: "Operations Manager A"
  },
  {
    reportedByName: "Customer Service Associate A",
    reporterPosition: "Customer Service Associate",
    reporterDepartment: "Trading Sales Support",
    reporterSite: "Trading Office",
    reportDate: "2026-05-09",
    reportTime: "10:05",
    classification: "BEHAVIORAL_CONCERN",
    incidentSite: "Customer Pickup Counter",
    incidentArea: "Release Documentation Window",
    incidentDate: "2026-05-09",
    incidentTime: "09:35",
    description:
      `${seedTag} | A customer-appointed truck representative became verbally aggressive after being advised that cement release documents were incomplete for the trading transaction.`,
    immediateActionTaken:
      "Counter staff stepped back and called the supervisor. Security stayed nearby while missing documents were explained to the representative.",
    reportTakenByName: "Admin Supervisor A",
    reportTakenByPosition: "Admin Supervisor",
    reportTakenDate: "2026-05-09",
    reportTakenTime: "10:25",
    impactHealthSafety: true,
    impactLegal: false,
    impactOperational: true,
    impactReputational: true,
    impactFinancial: false,
    impactOthers: false,
    impactDescription: "Staff safety concern and temporary release processing delay.",
    recommendation:
      "Use a document checklist before truck arrival and require supervisor mediation for escalated counter discussions.",
    notedBy: "Trading Manager A",
    approvedBy: "Operations Manager A"
  },
  {
    reportedByName: "Delivery Driver A",
    reporterPosition: "Delivery Driver",
    reporterDepartment: "Hauling Operations",
    reporterSite: "Assigned Truck Unit CT-024",
    reportDate: "2026-05-10",
    reportTime: "17:10",
    classification: "OTHERS",
    classificationOtherText: "Customer site access delay",
    incidentSite: "Customer Construction Site",
    incidentArea: "Site Entry Road",
    incidentDate: "2026-05-10",
    incidentTime: "16:35",
    description:
      `${seedTag} | Truck Unit CT-024 carrying bagged cement for a trading delivery was held at the customer site entry road because the site access permit was not ready upon arrival.`,
    immediateActionTaken:
      "Driver notified dispatch and waited at the designated roadside holding point. Customer contact was asked to confirm safe entry time.",
    reportTakenByName: "Route Coordinator A",
    reportTakenByPosition: "Route Coordinator",
    reportTakenDate: "2026-05-10",
    reportTakenTime: "17:30",
    impactHealthSafety: false,
    impactLegal: false,
    impactOperational: true,
    impactReputational: true,
    impactFinancial: true,
    impactOthers: true,
    impactOtherText: "Waiting time exposure",
    impactDescription: "Possible delivery delay, customer coordination issue, and waiting time cost.",
    recommendation:
      "Confirm customer site access permit before dispatch gate-out and document waiting time approval when delays exceed agreed window.",
    notedBy: "Transport Manager A",
    approvedBy: "Trading Manager A"
  }
];

async function apiRequest(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${options?.method ?? "GET"} ${path} failed: ${response.status} ${JSON.stringify(payload)}`);
  }
  return payload;
}

async function alreadySeeded() {
  const payload = await apiRequest(`/incidents?search=${encodeURIComponent(seedTag)}&take=1`);
  return payload.data.total > 0;
}

async function main() {
  console.log(`Seeding synthetic cement trucking incidents to ${API_URL}`);
  if (await alreadySeeded()) {
    console.log(`Seed skipped: records with tag ${seedTag} already exist.`);
    return;
  }

  for (const [index, incident] of incidents.entries()) {
    const payload = await apiRequest("/incidents", {
      method: "POST",
      body: JSON.stringify(incident)
    });
    console.log(`${index + 1}/${incidents.length}: ${payload.data.referenceNo} ${payload.data.classification}`);
  }

  const verification = await apiRequest(`/incidents?search=${encodeURIComponent(seedTag)}&take=100`);
  console.log(`Seed complete. Matching records: ${verification.data.total}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});