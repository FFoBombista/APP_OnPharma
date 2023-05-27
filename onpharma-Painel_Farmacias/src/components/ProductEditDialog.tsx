import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Box, Dialog, DialogContent, DialogTitle, InputLabel, Input, TextField, Select, MenuItem, Button } from "@mui/material";
import { FormEvent } from "react";


type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (event: FormEvent<HTMLFormElement>) => void;
    categories: Category[];
    product?: Product;
    disabled?: boolean;

};


export const ProducEditDialog = ({open, onClose, onSave, categories, product, disabled}: Props) => {
    
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(event);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> {product ? 'Editar Produto': 'Novo Produto'} </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <Box sx={{mb: 2}}>
                            <InputLabel variant="standard" htmlFor="imgField">Imagem</InputLabel>
                            <Input 
                                id="imgField"
                                name="image"
                                type="file"
                                fullWidth
                                disabled={disabled}
                                inputProps={{accept: 'image/*'}}
                            />
                        </Box>
                        <Box sx={{mb: 2}}>
                        <InputLabel variant="standard" htmlFor="nameField">Nome</InputLabel>
                            <TextField 
                                id="nameField"
                                variant="standard"
                                name="name"
                                defaultValue={product?.name}
                                required
                                fullWidth
                                disabled={disabled}
                            />
                        </Box>
                        <Box sx={{mb: 2}}>
                        <InputLabel variant="standard" htmlFor="priceField">Preco (em R$)</InputLabel>
                            <TextField 
                                id="priceField"
                                variant="standard"
                                type="number"
                                name="price"
                                defaultValue={product?.price}
                                required
                                fullWidth
                                disabled={disabled}
                            />
                        </Box>
                        <Box sx={{mb: 2}}>
                        <InputLabel variant="standard" htmlFor="descField">Descricao</InputLabel>
                            <TextField 
                                id="descField"
                                variant="standard"
                                name="description"
                                defaultValue={product?.description}
                                multiline
                                rows={4}
                                required
                                fullWidth
                                disabled={disabled}
                            />
                        </Box>
                        <Box sx={{mb: 2}}>
                            <InputLabel variant="standard" htmlFor="catField">Categoria</InputLabel>
                            <Select
                                id="catField"
                                variant="standard"
                                name="category"
                                defaultValue={product?.category.id || categories[0]?.id}
                                required
                                fullWidth
                                disabled={disabled}
                            >
                                {categories.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}

                            </Select>
                        </Box>

                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button disabled={disabled} onClick={onClose}>Cancelar</Button>
                            <Button disabled={disabled} type="submit">Salvar</Button>

                        </Box>
                    </Box>
                </DialogContent>
        </Dialog>
    );

};