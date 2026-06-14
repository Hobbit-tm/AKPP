import BrandPageTemplate from "../components/BrandPageTemplate";

export default function RemontAKPPToyota() {
  return (
    <BrandPageTemplate
      brand="Toyota"
      models={[
        "Camry",
        "Corolla",
        "RAV4",
        "Highlander",
        "Land Cruiser",
        "Prado",
      ]}
    />
  );
}
