Feature: I check client token

  Scenario: I check negatively admin token
    Given I use admin token
    When I send a "POST" request to "/api/v1/auth-check/client"
    Then the response status should be 403
    And the response body should contain:
      """json
      {
        "message": "Forbidden resource",
        "error": "Forbidden",
        "statusCode": 403
      }
      """

  Scenario: I check positively client token
    Given I use client token
    When I send a "POST" request to "/api/v1/auth-check/client"
    Then the response status should be 204

  Scenario: I check negatively on no token
    Given I do not use token
    When I send a "POST" request to "/api/v1/auth-check/client"
    Then the response status should be 401
    And the response body should contain:
      """json
      {
        "message": "Unauthorized",
        "statusCode": 401
      }
      """
