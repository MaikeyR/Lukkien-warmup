module.exports = (api) => {
  const isCoverage = process.env.CYPRESS_COVERAGE === "true";
  api.cache(true);
  return {
    presets: ["next/babel"],
    plugins: isCoverage
      ? [["istanbul", { exclude: ["app/layout.tsx", ".next/**", "features/projects/generated/queries.graphql.ts"] }]]
      : [],
  };
};
