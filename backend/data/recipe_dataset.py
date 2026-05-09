from datasets import load_dataset, Dataset
import json
from hashlib import sha1

class RecipeDatasetLoader:
    def __init__(self,
                 dataset_name: str = "nuhuibrahim/recifine", 
                 split: str = "train", 
                 assign_id: bool = False,
                 batch_size: int = 5, 
                 testing: bool = False):
        
        self.dataset_name = dataset_name
        self.split = split
        self.batch_size = batch_size

        self.dataset_dict = load_dataset(dataset_name)

        if split not in self.dataset_dict:
            raise ValueError(
                'Split {} not in dataset. Choose from {}'.format(split,list(self.dataset_dict.keys())))

        self.dataset = self.dataset_dict[split]

        # Testing only
        if testing:
            self.dataset = self.dataset.select(range(batch_size))

        if assign_id:
            self.generate_ids()

    def generate_ids(self):
        def add_ids_batched(batch):
            batch["id"] = [sha1(link.strip().encode("utf-8")).hexdigest() for link in batch["link"]][:12]
            return batch

        self.dataset = self.dataset.map(
            add_ids_batched,
            batched=True,
            num_proc=4)
            
        return self
    
# Testing classes
loader = RecipeDatasetLoader(dataset_name="nuhuibrahim/recifine",split="train", testing=True, batch_size=5, assign_id=True)
print(len(loader.dataset))
print(loader.dataset[0])
