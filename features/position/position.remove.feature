Feature: I can set and get position report

  Scenario: I cannot remove position history when not authenticated
    When I send a "DELETE" request to "/api/v1/position/DLH1234"
    Then the response status should be 401
    And the response body should contain:
      """json
      {
        "message": "Unauthorized",
        "statusCode": 401
      }
      """
