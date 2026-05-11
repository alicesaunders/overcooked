# Recipe Search Engine
<b> overcooked </b>  is a semantic recipe search engine built on the  ReciFine (2.2+ million recipes) corpus, derived from [RecipeNLG](https://aclanthology.org/2020.inlg-1.4/) , and available on [hugging face.](https://huggingface.co/datasets/nuhuibrahim/recifine)

v1.0.0: Users can input available ingredients from a free text field, and then return relevant recipe suggestions. 

v1.1.0: Users can generate a new recipe using a generative model.


<b> Authors</b>: Alice Saunders, Georgia Gunson

## System architecture

```mermaid 
graph LR  
    A[User Input Query] --> B[Preprocess Text]
    B --> C[Encode Query]
    R[Recipe Corpus] --> S[Encode Recipes]
    C --> D[Compute Similarity Scores]
    S --> D
    D --> E{Rank Recipes}
    E --> F[Select Top N Recipes]
    F --> G[Return Results to User]
```

## Prerequisites
* Python 3.11.6


## Project Structure

## Installation


