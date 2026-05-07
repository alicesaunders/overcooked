# Recipe Search Engine
<b> overcooked </b>  is a semantic recipe search engine built on the  ReciFine (2.2+ million recipes) corpus, derived from [RecipeNLG](https://aclanthology.org/2020.inlg-1.4/) , and available on [hugging face.](https://huggingface.co/datasets/nuhuibrahim/recifine)

v1.0.0: Users can input available ingredients from a free text field, and then return relevant recipe suggestions. 

v1.1.0: Users can generate a new recipe using a generative model.


<b> Authors</b>: Alice Saunders, Georgia Gunson

## System architecture

```mermaid 
graph LR  
A[User Input Query] --> B[Preprocess Query Text]  
B --> C[Encode Query with Transformer]  
C --> D[Encode Recipe Corpus (Embeddings)]  
D --> E[Compute Similarity Scores]  
E --> F{Rank Recipes}  
F --> G[Select Top N Recipes]  
G --> H[Return Results to User]
```

## Prerequisites
* Python 3.11.6


## Project Structure

## Installation


