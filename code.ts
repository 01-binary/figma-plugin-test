// This plugin will generate a sample codegen plugin
// that appears in the Element tab of the Inspect panel.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This provides the callback to generate the code.
figma.codegen.on("generate", async (event) => {
  const code = `{
    name: "${event.node.name}"
  }`;
  if (event.node.type === "INSTANCE") {
    const css = await event.node.getCSSAsync();
    const bg = css?.background;

    const match = bg.match(/var\(--(.*?),/);

    const variableName = match ? match[1] : null;

    const cssCode = `{
  bg-tailwind: "bg-${variableName}"
}`;

    // return [
    //   {
    //     language: "CSS",
    //     code: cssCode,
    //     title: "binary figma Test CSS",
    //   },
    // ];

    const htmlCode = `<div className=bg-${variableName}>content</div>`;
    return [
      {
        language: "HTML",
        code: htmlCode,
        title: "binary figma Test CSS",
      },
    ];
  }

  return [
    {
      language: "PLAINTEXT",
      code: code,
      title: "binary figma Test",
    },
  ];
});
