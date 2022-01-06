const fastestsmallesttextencoderdecoder = require("fastestsmallesttextencoderdecoder");
global.TextEncoder = fastestsmallesttextencoderdecoder.TextEncoder;
(global as any).TextDecoder = fastestsmallesttextencoderdecoder.TextDecoder;