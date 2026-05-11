import urllib.request, json, time

print("Testing Render POST...")
for attempt in range(10):
    time.sleep(15)
    try:
        body = json.dumps({
            "reportedByName": "Online Test",
            "classification": "SAFETY_VIOLATION",
            "description": "Testing Render.",
            "impactOperational": True
        }).encode()
        req = urllib.request.Request(
            "https://ir-incident-api.onrender.com/incidents",
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        resp = urllib.request.urlopen(req, timeout=30)
        result = json.loads(resp.read().decode())
        print("POST WORKED! Ref:", result["data"]["referenceNo"])
        print("Status:", result["data"]["status"])
        print("BACKEND VERIFIED WITH SUPABASE! 🎉")
        break
    except urllib.error.HTTPError as e:
        print(f"Attempt {attempt+1}: HTTP {e.code} - {e.reason}")
    except Exception as e:
        print(f"Attempt {attempt+1}: {type(e).__name__} - {e}")
else:
    print("Still failing after 10 attempts")