$username = "user"
$password = "test"
$client_id = "employee-management-service"
$uri = "http://localhost:4200/auth"
$body = "grant_type=password&client_id=$client_id&username=$username&password=$password"
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/x-www-form-urlencoded")
$response = Invoke-RestMethod -Uri $uri -Method Post -Body $body -Headers $headers

# Convert the response to a JSON object
$response | ConvertTo-Json
