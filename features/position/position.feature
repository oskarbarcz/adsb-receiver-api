Feature: I can set and get position report

  Scenario: I manage position report
    # reset cache before test
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/position/DLH1234"
    Then the response status should be 204

    # add position report
    Given I use client token
    When I send a "POST" request to "/api/v1/position" with body:
      """json
      {
        "longitude": 50.27893,
        "latitude": 19.1263808,
        "callsign": "DLH1234"
      }
      """
    Then the response status should be 204
    When I send a "POST" request to "/api/v1/position" with body:
      """json
      {
        "longitude": 51.27893,
        "latitude": 20.1263808,
        "callsign": "DLH1234"
      }
      """
    Then the response status should be 204

    # check position report
    Given I do not use token
    When I send a "GET" request to "/api/v1/position/DLH1234"
    Then the response status should be 200
    And the response body should contain:
      """json
      [
        {
          "date": "@date('within 1 minute from now')",
          "longitude": 50.27893,
          "latitude": 19.1263808,
          "callsign": "DLH1234"
        },
        {
          "date": "@date('within 1 minute from now')",
          "longitude": 51.27893,
          "latitude": 20.1263808,
          "callsign": "DLH1234"
        }
      ]
      """

    # clear after test
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/position/DLH1234"
    Then the response status should be 204

    # check if position report is cleared
    Given I do not use token
    When I send a "GET" request to "/api/v1/position/DLH1234"
    Then the response status should be 200
    And the response body should contain:
      """json
      []
      """
