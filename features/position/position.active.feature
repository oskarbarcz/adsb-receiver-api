Feature: I can get active callsigns

  Scenario: I get active callsigns that logged in last 5 minutes
    # Clear cache before test
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/position/DLH1234"
    Then the response status should be 204
    When I send a "DELETE" request to "/api/v1/position/UAL456"
    Then the response status should be 204
    When I send a "DELETE" request to "/api/v1/position/BAW789"
    Then the response status should be 204

    # Verify no active callsigns initially
    Given I do not use token
    When I send a "GET" request to "/api/v1/position/active"
    Then the response status should be 200
    And the response body should contain:
      """json
      {
        "callsigns": []
      }
      """

    # Add a recent position for DLH1234
    Given I use client token
    When I send a "POST" request to "/api/v1/position" with body:
      """json
      {
        "callsign": "DLH1234",
        "latitude": 51.47115,
        "longitude": -0.47351,
        "altitude": 91.95149,
        "verticalRate": 0,
        "squawk": "6222",
        "groundSpeed": 0.32597,
        "track": 179.07342,
        "alert": false,
        "emergency": false,
        "spi": false,
        "isOnGround": true
      }
      """
    Then the response status should be 204

    # Add another recent position for UAL456
    When I send a "POST" request to "/api/v1/position" with body:
      """json
      {
        "callsign": "UAL456",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "altitude": 35000,
        "verticalRate": 500,
        "squawk": "1234",
        "groundSpeed": 450,
        "track": 90,
        "alert": false,
        "emergency": false,
        "spi": false,
        "isOnGround": false
      }
      """
    Then the response status should be 204

    # Check that both callsigns are active
    Given I do not use token
    When I send a "GET" request to "/api/v1/position/active"
    Then the response status should be 200
    And the response body should contain:
      """json
      {
        "callsigns": ["DLH1234", "UAL456"]
      }
      """

    # Clear after test
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/position/DLH1234"
    Then the response status should be 204
    When I send a "DELETE" request to "/api/v1/position/UAL456"
    Then the response status should be 204

  Scenario: I get only recent callsigns, not old ones
    # Clear cache before test
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/position/OLD123"
    Then the response status should be 204

    # Add an old position (more than 5 minutes ago)
    Given I use client token
    When I send a "POST" request to "/api/v1/position" with body:
      """json
      {
        "callsign": "OLD123",
        "date": "2020-01-01T12:00:00.000Z",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "altitude": 35000,
        "verticalRate": 500,
        "squawk": "1234",
        "groundSpeed": 450,
        "track": 90,
        "alert": false,
        "emergency": false,
        "spi": false,
        "isOnGround": false
      }
      """
    Then the response status should be 204

    # Check that old callsign is not active
    Given I do not use token
    When I send a "GET" request to "/api/v1/position/active"
    Then the response status should be 200
    And the response body should contain:
      """json
      {
        "callsigns": []
      }
      """

    # Clear after test
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/position/OLD123"
    Then the response status should be 204
