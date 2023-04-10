<template>
  <div>
    <h2>Code Conversion</h2>
    <h4>Select languages:</h4>
    <select v-model="selectedLanguages" @change="clearText">
      <option value="java-csharp">Java to C#</option>
      <option value="csharp-java">C# to Java</option>
      <option value="javascript-python">JavaScript to Python</option>
      <option value="python-javascript">Python to JavaScript</option>
      <option value="python-ruby">Python to Ruby</option>
      <option value="ruby-python">Ruby to Python</option>
      <option value="c-cpp">C to C++</option>
      <option value="cpp-c">C++ to C</option>
    </select>
    <div class="code-converter">
      <div>
        <label for="sourceCode">Source Code:</label>
        <textarea id="sourceCode" v-model="sourceCode" @input="convertCode"></textarea>
      </div>
      <div>
        <label for="convertedCode">Converted Code:</label>
        <textarea id="convertedCode" v-model="convertedCode" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceCode: "",
      convertedCode: "",
      selectedLanguages: "java-csharp",
    };
  },
  methods: {
    clearText() {
      this.sourceCode = "";
      this.convertedCode = "";
    },
    convertCode() {
      switch (this.selectedLanguages) {
        case "java-csharp":
          this.convertJavaToCSharp();
          break;
        case "javascript-python":
          this.convertJavaScriptToPython();
          break;
        case "python-ruby":
          this.convertPythonToRuby();
          break;
        case "c-cpp":
          this.convertCToCpp();
          break;
        case "cpp-c":
          this.convertCppToC();
          break;
        case "csharp-java":
          this.convertCSharpToJava();
          break;
        case "python-javascript":
          this.convertPythonToJavaScript();
          break;
        case "ruby-python":
          this.convertRubytoPython();
          break;
          
      }
    },
    convertJavaToCSharp() {
      const rules = [
        { from: /final/g, to: "readonly" },
        { from: /boolean/g, to: "bool" },
        { from: /extends/g, to: ":" },
        { from: /implements/g, to: ":" },
        { from: /super\./g, to: "base." },
        { from: /import/g, to: "using" },
        { from: /System\.out\.println/g, to: "Console.WriteLine" },
        { from: /public\s+class\s+(\w+)/g, to: "public class $1" },
        { from: /public\s+interface\s+(\w+)/g, to: "public interface $1" },
        { from: /extends\s+(\w+)/g, to: ": $1" },
        { from: /implements\s+(\w+)/g, to: ", $1" },
        { from: /List<(\w+)>/g, to: "List<$1>" },
      ];
      let csharpCode = this.sourceCode;
      rules.forEach((rule) => {
        csharpCode = csharpCode.replace(rule.from, rule.to);
      });

      this.convertedCode = csharpCode;
    },
    convertJavaScriptToPython() {
      const rules = [
        { from: /let/g, to: "" },
        { from: /const/g, to: "" },
        { from: /var/g, to: "" },
        { from: /console.log\(/g, to: "print(" },
        { from: /function\s+(\w+)\s*\((.*?)\)\s*{/g, to: "def $1($2):" },
        { from: /(\w+)\s*=>\s*{/g, to: "def $1():" },
        { from: /}/g, to: "" },
      ];

      let pythonCode = this.sourceCode;
      rules.forEach((rule) => {
        pythonCode = pythonCode.replace(rule.from, rule.to);
      });

      this.convertedCode = pythonCode
    },
    convertPythonToRuby() {
      const rules = [
        { from: /def/g, to: "def" },
        { from: /lambda/g, to: "lambda" },
        { from: /True/g, to: "true" },
        { from: /False/g, to: "false" },
        { from: /None/g, to: "nil" },
        { from: /print/g, to: "puts" },
        { from: /self\./g, to: "@" },
      ];

      let rubyCode = this.sourceCode;
      rules.forEach((rule) => {
        rubyCode = rubyCode.replace(rule.from, rule.to);
      });

      this.convertedCode = rubyCode;
    },
    convertRubytoPython() {
      const rules = [
      { from: /def\s+(\w+)\s*\((.*?)\)/g, to: "def $1($2):" },
      { from: /end/g, to: "" },
      { from: /elsif\s+(.*):/g, to: "elif $1:" },
      { from: /else:/g, to: "else:" },
      { from: /if\s+(.*):/g, to: "if $1:" },
      { from: /@\w+/g, to: "self.$&" },
      { from: /@/g, to: "" },
      { from: /puts\(/g, to: "print(" },
      { from: /\.to_i/g, to: "int" },
      { from: /\.to_f/g, to: "float" },
      { from: /\.to_s/g, to: "str" },
      { from: /lambda\s+\{(.*)\}/g, to: "lambda x: $1" },
      ];

      let pythonCode = this.sourceCode;
      rules.forEach((rule) => {
        pythonCode = pythonCode.replace(rule.from, rule.to);
      });

      this.convertedCode = pythonCode;
    },
    convertCToCpp() {
      const rules = [
        { from: /#include <stdio.h>/g, to: "#include <iostream>" },
        { from: /int main\(\)/g, to: "int main()" },
        { from: /printf\(/g, to: "std::cout <<" },
        { from: /"%d"/g, to: "" },
        { from: /"%s"/g, to: "" },
        { from: /\\n"/g, to: "<< std::endl" },
        { from: /, /g, to: " << " },
        { from: /\);/g, to: ";" },
        { from: /return 0;/g, to: "return 0;" },
      ];

      let cppCode = this.sourceCode;
      rules.forEach((rule) => {
        cppCode = cppCode.replace(rule.from, rule.to);
      });

      this.convertedCode = cppCode;
    },
    convertCSharpToJava() {
      const rules = [
      { from: /using System;/g, to: "" },
      { from: /Console.WriteLine\(/g, to: "System.out.println(" },
      { from: /void Main\(\)/g, to: "public static void main(String[] args)" },
      { from: /bool/g, to: "boolean" },
      { from: /String/g, to: "String" },
      { from: /List<(.+)>/g, to: "ArrayList<$1>" },
      { from: /Dictionary<(.+),\s*(.+)>/g, to: "HashMap<$1, $2>" },
      { from: /new List<(.+)>/g, to: "new ArrayList<$1>" },
      { from: /new Dictionary<(.+),\s*(.+)>/g, to: "new HashMap<$1, $2>" },
      { from: /using\s+(.+);/g, to: "import $1;" },
      { from: /public\s+class\s+(\w+)\s*{/g, to: "public class $1 {" },
      { from: /public\s+(\w+)\s*\((.*?)\)\s*{/g, to: "public $1($2) {" },
      { from: /private\s+(\w+)\s*\((.*?)\)\s*{/g, to: "private $1($2) {" },
      { from: /protected\s+(\w+)\s*\((.*?)\)\s*{/g, to: "protected $1($2) {" },
      { from: /public\s+static\s+(\w+)\s+(\w+)\s*{/g, to: "public static $1 $2 {" },
      { from: /private\s+static\s+(\w+)\s+(\w+)\s*{/g, to: "private static $1 $2 {" },
      { from: /protected\s+static\s+(\w+)\s+(\w+)\s*{/g, to: "protected static $1 $2 {" },
      { from: /return;/g, to: "return;" },
      { from: /return\s+(.+);/g, to: "return $1;" },
      { from: /}\s*catch\s*\((.+)\)/g, to: "} catch ($1) {" },
      ];

      let javaCode = this.sourceCode;
      rules.forEach((rule) => {
        javaCode = javaCode.replace(rule.from, rule.to);
      });

      this.convertedCode = javaCode;
    },

convertPythonToJavaScript() {
  // Basic Python to JavaScript syntax conversion rules
  const rules = [
    { from: /print\(/g, to: "console.log(" },
    { from: /def\s+(\w+)\s*\((.*?)\):/g, to: "function $1($2) {" },
    { from: /range\((\d+)\)/g, to: "Array.from({length: $1}, (_, i) => i)" },
    { from: /for\s+(\w+)\s+in\s+range\((\d+)\):/g, to: "for (let $1 = 0; $1 < $2; $1++) {" },
    { from: /elif\s+(.*):/g, to: "else if ($1) {" },
    { from: /else:/g, to: "else {" },
    { from: /if\s+(.*):/g, to: "if ($1) {" },
  ];

  let javaScriptCode = this.sourceCode;
  rules.forEach((rule) => {
    javaScriptCode = javaScriptCode.replace(rule.from, rule.to);
  });

  this.convertedCode = javaScriptCode;
},

convertCppToC() {
  // Basic C++ to C syntax conversion rules
  const rules = [
    { from: /#include <iostream>/g, to: "#include <stdio.h>" },
    { from: /std::cout\s*<</g, to: "printf(" },
    { from: /std::endl/g, to: "\\n" },
    { from: /;/g, to: ");" },
    { from: /std::string/g, to: "char *" },
    { from: /std::cin\s*>>/g, to: "scanf(" },
    { from: /std::istream&/g, to: "FILE *" },
    { from: /std::ostream&/g, to: "FILE *" },
    { from: /std::ifstream/g, to: "FILE *" },
    { from: /std::ofstream/g, to: "FILE *" },
  ];

  let cCode = this.sourceCode;
  rules.forEach((rule) => {
    cCode = cCode.replace(rule.from, rule.to);
  });

  this.convertedCode = cCode;
},
},
};
</script>

<style scoped>
.code-converter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

textarea {
  width: 100%;
  height: 300px;
  resize: none;
  padding: 5px;
  font-family: monospace;
}

select {
  margin-bottom: 20px;
}
</style>