JsonHandler = require '../../../src/handler/JsonHandler'

describe 'JsonHandler', ->

    beforeEach ->
        @subject = new JsonHandler()

    it 'resolves to the parsed JSON data for JSON files', ->
        path = "#{__dirname}/../../fixture/valid/json.json"
        expected = ['json', {a: 1, b: 2}]

        return @subject.handle path
        .then (actual) ->
            assert.deepEqual actual, expected

    it 'resolves to null for non-JSON files', ->
        path = "#{__dirname}/../../fixture/valid/other.other"

        return @subject.handle path
        .then (actual) ->
            assert.isNull actual

    it 'handles invalid JSON data', ->
        path = "#{__dirname}/../../fixture/invalid/json.json"

        return @subject.handle path
        .catch (actual) ->
            assert.instanceOf actual, SyntaxError

    it 'handles file system errors', ->
        path = "#{__dirname}/../../fixture/invalid/nonexistent.json"

        return @subject.handle path
        .catch (actual) ->
            assert.instanceOf actual, Error