-- Create enums safely
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'IncidentClassification') THEN
        CREATE TYPE "IncidentClassification" AS ENUM ('ATTEMPTED_THEFT_PILFERAGE', 'PHYSICAL_INJURY', 'BEHAVIORAL_CONCERN', 'SAFETY_VIOLATION', 'DAMAGE_TO_PROPERTY', 'THEFT_PILFERAGE', 'ENVIRONMENT_CONCERN', 'TRESPASSING', 'MALICIOUS_MISCHIEF', 'VEHICULAR_ACCIDENT', 'OPERATIONAL_PROCEDURE', 'OTHERS');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'IncidentStatus') THEN
        CREATE TYPE "IncidentStatus" AS ENUM ('PENDING', 'OPEN', 'CLOSED');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS "Incident" (
    "id" TEXT NOT NULL,
    "referenceNo" TEXT NOT NULL UNIQUE,
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

CREATE INDEX IF NOT EXISTS "Incident_status_idx" ON "Incident"("status");
CREATE INDEX IF NOT EXISTS "Incident_classification_idx" ON "Incident"("classification");
CREATE INDEX IF NOT EXISTS "Incident_createdAt_idx" ON "Incident"("createdAt");