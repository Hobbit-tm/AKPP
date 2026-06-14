import BrandPageTemplate from "../components/BrandPageTemplate";

export default function RemontAKPPVolkswagen() {
  return (
    <BrandPageTemplate
      brand="Volkswagen"
      models={["Golf", "Passat", "Tiguan", "Touareg", "Polo"]}
    />
  );
}
