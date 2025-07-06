#Feature: I can set and get position report
#
#  Scenario: As an admin I can create user
#    When I send a "DELETE" request to "/api/v1/position/DLH1234"
#    Then the response status should be 204
#    When I send a "POST" request to "/api/v1/position" with body:
#      """json
#      {
#        "longitude": 50.27893,
#        "latitude": 19.1263808,
#        "callsign": "DLH1234"
#      }
#      """
#    Then the response status should be 204
#    When I send a "POST" request to "/api/v1/position" with body:
#      """json
#      {
#        "longitude": 51.27893,
#        "latitude": 20.1263808,
#        "callsign": "DLH1234"
#      }
#      """
#    Then the response status should be 204
#    Then I wait for 1000 ms
#    When I send a "GET" request to "/api/v1/position/DLH1234"
#    Then the response body should contain:
#      """json
#      [
#        {
#          "date": "@date('within 1 minute from now')",
#          "longitude": 50.27893,
#          "latitude": 19.1263808,
#          "callsign": "DLH1234"
#        },
#        {
#          "date": "@date('within 1 minute from now')",
#          "longitude": 51.27893,
#          "latitude": 20.1263808,
#          "callsign": "DLH1234"
#        }
#      ]
#      """
#    When I send a "DELETE" request to "/api/v1/position/DLH1234"
#    Then the response status should be 204
#    When I send a "GET" request to "/api/v1/position/DLH1234"
#    And I dump response
#    Then the response status should be 200
#    Then the response body should contain:
#      """json
#      [
#      ]
#      """
