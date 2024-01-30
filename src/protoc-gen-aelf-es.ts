#!/usr/bin/env -S npx tsx

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createEcmaScriptPlugin, runNodeJs } from "@bufbuild/protoplugin";
import { version } from "../package.json";
import { localName, type Schema } from "@bufbuild/protoplugin/ecmascript";
import { hasExtension, MethodKind } from "@bufbuild/protobuf";
import { is_view } from "./gen/aelf/options_pb.js";

const protocGenAElfEs = createEcmaScriptPlugin({
  name: "protoc-gen-aelf-es",
  version: `v${String(version)}`,
  generateTs,
});

// prettier-ignore
function generateTs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_aelf.ts");
    f.preamble(file);
    for (const service of file.services) {
      f.print(f.jsDoc(service));
      f.print(f.exportDecl("abstract class", localName(service) + "Client"), " {");
      f.print();

      for (const method of service.methods) {
        
        if (method.methodKind === MethodKind.Unary) {
          f.print();
          f.print(f.jsDoc(method, "    "));
          f.print("    abstract async ", method.name, "(request: ", method.input, "): Promise<", method.output, "> {");
          
          if (method.proto.options && hasExtension(method.proto.options, is_view)) {
            f.print("    // this is a view method");
          } else {
            f.print("    // this is a send method");
          }

          f.print("    }");
        }
      }
      f.print("}");
    }
  }
}

runNodeJs(protocGenAElfEs);