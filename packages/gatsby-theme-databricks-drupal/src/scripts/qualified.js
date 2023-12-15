export const qualifiedScript = `var scriptTag = document.createElement('script');
scriptTag.type = 'text/javascript';
scriptTag.async = true;
scriptTag.src = "https://js.qualified.com/qualified.js?token=KbmrrC8pEQRX5uYq";
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(scriptTag, s);
(function(w,q){w['QualifiedObject']=q;w[q]=w[q]||function(){
    (w[q].q=w[q].q||[]).push(arguments)};})(window,'qualified')`

export const qualifiedPages = [
  "/kr",
  "/jp",
  "/product/",
  "/resources/",
  "/discoverlakehouse",
  "/solutions",
  "/discover/demos",
  "/discover/demos/databricks-platform-demo",
  "/discover/demos/delta-lake",
  "/discover/demos/databricks-sql",
  "/discover/demos/machine-learning-with-mlflow",
  "/discover/demos/azure-databricks-cloud-integration",
  "/discover/demos/delta-live-tables-demo",
  "/discover/demos/delta-lake-data-integration-demo-auto-loader-and-copy-into",
  "/discover/demos/databricks-platform",
  "/discover/demos/aws-databricks-cloud-integration",
  "/discover/demos/solutions-accelerator-demo-demand-forecasting",
  "/discover/demos/solutions-accelerator-demo-esg",
  "/discover/demos/solutions-accelerator-demo-customer-lifetime-value-clv",
  "/discover/demos/databricks-sql-data-warehousing-admin-demo",
  "/discover/value-calculator",
  "/resources/demos",
  "/company/contact",
  "/blog/2023/03/24/hello-dolly-democratizing-magic-chatgpt-open-models.html",
  "/blog/2023/04/12/dolly-first-open-commercially-viable-instruction-tuned-llm",
  "/product/dolly",
  "/blog/2023/04/17/databricks-lakehouse-lowers-total-cost-ownership-and-enables-ai-scale.html",
  "/p/thank-you/google-cloud-free-trial-147568",
  "/p/thank-you/azure-free-trial-experience",
]

export const qualifiedExcludedPages = [
  "/fr/",
  "/de/",
  "/it/",
  "/apj-",
  "/anz-",
  "/apac-",
  "emea-",
]

export const qualifiedExcludedPagesExactMatch = [
  "/resources/demos",
  "/resources/demos/library",
]
