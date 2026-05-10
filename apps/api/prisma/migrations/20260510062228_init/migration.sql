-- CreateEnum
CREATE TYPE "IncidentClassification" AS ENUM ('ATTEMPTED_THEFT_PILFERAGE', 'PHYSICAL_INJURY', 'BEHAVIORAL_CONCERN', 'SAFETY_VIOLATION', 'DAMAGE_TO_PROPERTY', 'THEFT_PILFERAGE', 'ENVIRONMENT_CONCERN', 'TRESPASSING', 'MALICIOUS_MISCHIEF', 'VEHICULAR_ACCIDENT', 'OPERATIONAL_PROCEDURE', 'OTHERS');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('PENDING', 'OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "referenceNo" TEXT NOT NULL,
    "reportedByName" TEXT NOT NULL,
    "reporterPosition" TEXT,
    "reporterDepartment" TEXT,
    "reporterSite" TEXT,
    "reportDate" TIMESTAMP(3),
    "reportTime" TEXT,
    "classification" "IncidentClassification" NOT NULL,
    "classificationOtherText" TEXT,
    "incidentSite" TEXT,
    "incidentArea" TEXT,
    "incidentDate" TIMESTAMP(3),
    "incidentTime" TEXT,
    "description" TEXT NOT NULL,
    "immediateActionTaken" TEXT,
    "reportTakenByName" TEXT,
    "reportTakenByPosition" TEXT,
    "reportTakenDate" TIMESTAMP(3),
    "reportTakenTime" TEXT,
    "status" "IncidentStatus" NOT NULL DEFAULT 'PENDING',
    "statusNotes" TEXT,
    "closedAt" TIMESTAMP(3),
    "impactHealthSafety" BOOLEAN NOT NULL DEFAULT false,
    "impactLegal" BOOLEAN NOT NULL DEFAULT false,
    "impactOperational" BOOLEAN NOT NULL DEFAULT false,
    "impactReputational" BOOLEAN NOT NULL DEFAULT false,
    "impactFinancial" BOOLEAN NOT NULL DEFAULT false,
    "impactOthers" BOOLEAN NOT NULL DEFAULT false,
    "impactOtherText" TEXT,
    "impactDescription" TEXT,
    "recommendation" TEXT,
    "notedBy" TEXT,
    "approvedBy" TEXT,
    "submittedByUserId" TEXT,
    "submittedByEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Incident_referenceNo_key" ON "Incident"("referenceNo");

-- CreateIndex
CREATE INDEX "Incident_status_idx" ON "Incident"("status");

-- CreateIndex
CREATE INDEX "Incident_classification_idx" ON "Incident"("classification");

-- CreateIndex
CREATE INDEX "Incident_incidentDate_idx" ON "Incident"("incidentDate");

-- CreateIndex
CREATE INDEX "Incident_createdAt_idx" ON "Incident"("createdAt");
