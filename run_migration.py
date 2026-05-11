import urllib.request, json

sql = """
CREATE TYPE IF NOT EXISTS "IncidentClassification" AS ENUM ('ATTEMPTED_THEFT_PILFERAGE', 'PHYSICAL_INJURY', 'BEHAVIORAL_CONCERN', 'SAFETY_VIOLATION', 'DAMAGE_TO_PROPERTY', 'THEFT_PILFERAGE', 'ENVIRONMENT_CONCERN', 'TRESPASSING', 'MALICIOUS_MISCHIEF', 'VEHICULAR_ACCIDENT', 'OPERATIONAL_PROCEDURE', 'OTHERS');
CREATE TYPE IF NOT EXISTS "IncidentStatus" AS ENUM ('PENDING', 'OPEN', 'CLOSED');
CREATE TABLE IF NOT EXISTS "Incident" (
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
CREATE UNIQUE INDEX IF NOT EXISTS "Incident_referenceNo_key" ON "Incident"("referenceNo");
CREATE INDEX IF NOT EXISTS "Incident_status_idx" ON "Incident"("status");
CREATE INDEX IF NOT EXISTS "Incident_classification_idx" ON "Incident"("classification");
CREATE INDEX IF NOT EXISTS "Incident_incidentDate_idx" ON "Incident"("incidentDate");
CREATE INDEX IF NOT EXISTS "Incident_createdAt_idx" ON "Incident"("createdAt");
"""

# Try Supabase Management API to run SQL
mgmt_url = "https://api.supabase.com/v1/projects/thiwhswmbvqtereqkvte/database/query"
mgmt_headers = {
    "apikey": "sb_publishable_hbD6mxz78gQUjt4IpIWl5Q_-M7WwwTe",
    "Authorization": "Bearer sb_publishable_hbD6mxz78gQUjt4IpIWl5Q_-M7WwwTe",
    "Content-Type": "application/json"
}

body = json.dumps({"query": sql}).encode()
req = urllib.request.Request(mgmt_url, data=body, headers=mgmt_headers, method="POST")
try:
    r = urllib.request.urlopen(req, timeout=30)
    print(f"Migration result: HTTP {r.status}")
    print(r.read().decode()[:300])
except urllib.error.HTTPError as e:
    err = e.read().decode()
    print(f"Migration failed: HTTP {e.code}")
    print(f"Response: {err[:500]}")
except Exception as e:
    print(f"Connection error: {e}")