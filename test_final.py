import urllib.request, json, time

print("Testing Render with pooler URL...")
for i in range(8):
    time.sleep(15)
    try:
        r = urllib.request.urlopen("https://ir-incident-api.onrender.com/health", timeout=15)
        if r.status == 200:
            print("Health OK (attempt", i+1, ")")
            time.sleep(5)
            body = json.dumps({"reportedByName": "Final Test", "classification": "SAFETY_VIOLATION", "description": "Testing with pooler.", "impactOperational": True}).encode()
            req = urllib.request.Request("https://ir-incident-api.onrender.com/incidents", data=body, headers={"Content-Type": "application/json"}, method="POST")
            resp = urllib.request.urlopen(req, timeout=30)
            result = json.loads(resp.read().decode())
            print("POST WORKED! Ref:", result["data"]["referenceNo"])
            break
    except urllib.error.HTTPError as e:
        print("  Attempt", i+1, ":", e.code)
    except Exception as e:
        print("  Attempt", i+1, ":", type(e).__name__)
else:
    print("Render not responding")