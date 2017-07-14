/* global RAML, describe, it */

'use strict';

if (typeof window === 'undefined') {
  var raml           = require('../../lib/raml.js');
  var chai           = require('chai');
  var chaiAsPromised = require('chai-as-promised');

  chai.should();
  chai.use(chaiAsPromised);
} else {
  var raml           = RAML.Parser;

  chai.should();
}

describe('Schemas', function () {

  it('should not dereference schemas by default', function (done) {
    var expected = {
      "title": "Dereference test",
      "documentation": [
         {
           "title": "Some Documentation",
           "content": "# RAML Parser Doc\n[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/raml-org/raml-js-parser?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)\n\n[![Build Status](https://travis-ci.org/raml-org/raml-js-parser.png)](https://travis-ci.org/raml-org/raml-js-parser)\n[![Dependency Status](https://david-dm.org/raml-org/raml-js-parser.png)](https://david-dm.org/raml-org/raml-js-parser)\n\nThis is a JavaScript parser for [RAML](http://raml.org) version 0.8 as defined in the [0.8 RAML specification](https://github.com/raml-org/raml-spec/blob/master/raml-0.8.md)\n\nA newer [version](https://github.com/raml-org/raml-js-parser-2) is now available as a beta. It supports RAML 1.0 as well as RAML 0.8.\n"
         }
      ],
      "schemas": [
        {
          "lazyLoaded": "{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"array\",\n  \"items\": {\n    \"$ref\": \"../item.json\"\n  }\n}\n"
        },
        {
          "includedByVar": "{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"array\",\n  \"items\": {\n    \"$ref\": \"../item.json\"\n  }\n}\n"
        },
        {
          "inlineByVar": "{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"items\": {\n      \"$ref\": \"schemas/item.json\"\n    }\n  }\n}\n"
        }
      ],
      "resources": [
        {
          "relativeUri": "/items",
          "resources": [
            {
              "relativeUri": "/included-lazy",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"array\",\n  \"items\": {\n    \"$ref\": \"../item.json\"\n  }\n}\n"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "included-lazy" ]
            },
            {
              "relativeUri": "/included-by-var",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"array\",\n  \"items\": {\n    \"$ref\": \"../item.json\"\n  }\n}\n"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "included-by-var" ]
            },
            {
              "relativeUri": "/inline-by-var",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"items\": {\n      \"$ref\": \"schemas/item.json\"\n    }\n  }\n}\n"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "inline-by-var" ]
            },
            {
              "relativeUri": "/inline",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"items\": {\n      \"$ref\": \"schemas/item.json\"\n    }\n  }\n}\n"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "inline" ]
            }
          ],
          "relativeUriPathSegments": [ "items" ]
        }
      ]
    };

    raml.loadFile('http://localhost:9001/test/raml-files/dereference_incl_markdown.raml')
      .should.become(expected).and.notify(done);
  });

  it('should dereference all possible schemas with flag enabled', function (done) {
    var expected = {
      "title": "Dereference test",
      "documentation": [
         {
           "title": "Some Documentation",
           "content": "# RAML Parser Doc\n[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/raml-org/raml-js-parser?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)\n\n[![Build Status](https://travis-ci.org/raml-org/raml-js-parser.png)](https://travis-ci.org/raml-org/raml-js-parser)\n[![Dependency Status](https://david-dm.org/raml-org/raml-js-parser.png)](https://david-dm.org/raml-org/raml-js-parser)\n\nThis is a JavaScript parser for [RAML](http://raml.org) version 0.8 as defined in the [0.8 RAML specification](https://github.com/raml-org/raml-spec/blob/master/raml-0.8.md)\n\nA newer [version](https://github.com/raml-org/raml-js-parser-2) is now available as a beta. It supports RAML 1.0 as well as RAML 0.8.\n"
         }
      ],
      "schemas": [
        {
          "lazyLoaded": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"array\",\"items\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"]}}"
        },
        {
          "includedByVar": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"array\",\"items\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"]}}"
        },
        {
          "inlineByVar": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"items\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"]}}}"
        }
      ],
      "resources": [
        {
          "relativeUri": "/items",
          "resources": [
            {
              "relativeUri": "/included-lazy",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"array\",\"items\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"]}}"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "included-lazy" ]
            },
            {
              "relativeUri": "/included-by-var",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"array\",\"items\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"]}}"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "included-by-var" ]
            },
            {
              "relativeUri": "/inline-by-var",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"items\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"]}}}"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "inline-by-var" ]
            },
            {
              "relativeUri": "/inline",
              "methods": [
                {
                  "responses": {
                    "200": {
                      "body": {
                        "application/json": {
                          "schema": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"items\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"name\":{\"type\":\"string\"}},\"required\":[\"name\"]}}}"
                        }
                      }
                    }
                  },
                  "method": "get"
                }
              ],
              "relativeUriPathSegments": [ "inline" ]
            }
          ],
          "relativeUriPathSegments": [ "items" ]
        }
      ]
    };

    raml.loadFile('http://localhost:9001/test/raml-files/dereference_incl_markdown.raml', { dereferenceSchemas: true })
      .should.become(expected).and.notify(done);
  });
});
