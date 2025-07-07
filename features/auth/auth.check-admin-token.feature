Feature: I check admin token

  Scenario: I check positively admin token
    Given I use admin token
    When I send a "POST" request to "/api/v1/auth-check/admin"
    Then the response status should be 204

  Scenario: I check negatively client token
    Given I use client token
    When I send a "POST" request to "/api/v1/auth-check/admin"
    Then the response status should be 403
    And the response body should contain:
      """json
      {
        "message": "Forbidden resource",
        "error": "Forbidden",
        "statusCode": 403
      }
      """

  Scenario: I check negatively on no token
    Given I do not use token
    When I send a "POST" request to "/api/v1/auth-check/admin"
    Then the response status should be 401
    And the response body should contain:
      """json
      {
        "message": "Unauthorized",
        "statusCode": 401
      }
      """
