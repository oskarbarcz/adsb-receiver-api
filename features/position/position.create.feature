Feature: I can set and get position report

  Scenario: I cannot report position when not authenticated
    Given I do not use token
    When I send a "POST" request to "/api/v1/position" with body:
      """json
      {
        "longitude": 50.27893,
        "latitude": 19.1263808,
        "callsign": "DLH1234"
      }
      """
    Then the response status should be 401
    And the response body should contain:
      """json
      {
        "message": "Unauthorized",
        "statusCode": 401
      }
      """
