Feature: I can set and get position report

  Scenario: I cannot report position when not authenticated
    Given I do not use token
    When I send a "POST" request to "/api/v1/position" with body:
      """json
      {
        "callsign":"DLH1234",
        "date":"2025-08-08T15:46:38.2504671Z",
        "latitude":51.47115,
        "longitude":-0.47351,
        "altitude":91.95149,
        "verticalRate":0,
        "squawk":"6222",
        "groundSpeed":0.32597,
        "track":179.07342,
        "alert":false,
        "emergency":false,
        "spi":false,
        "isOnGround":true
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
