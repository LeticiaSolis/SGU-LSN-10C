import React, { useState, useEffect } from "react";
import axios from "axios";
const ENV = import.meta.env;

//const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE}`;
const API_URL = `${ENV.VITE_API_PROTOCOL}://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

function PersonaCRUD() {
    const [personas, setPersonas] = useState([]);
    const [form, setForm] = useState({ nombreCompleto: "", correo: "", telefono: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        obtenerPersonas();
    }, []);

    const obtenerPersonas = async () => {
        try {
            const res = await axios.get(API_URL);
            setPersonas(res.data);
        } catch (error) {
            console.error("Error al obtener personas", error);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, form);
                setEditId(null);
            } else {
                await axios.post(API_URL, form);
            }
            setForm({ nombreCompleto: "", correo: "", telefono: "" });
            obtenerPersonas();
        } catch (error) {
            console.error("Error al guardar persona", error);
        }
    };

    const handleEdit = (persona) => {
        setEditId(persona.id);
        setForm({
            nombreCompleto: persona.nombreCompleto,
            correo: persona.correo,
            telefono: persona.telefono,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
            await axios.delete(`${API_URL}/${id}`);
            obtenerPersonas();
        }
    };

    return (
        <div className="row justify-content-center">
            {/* FORMULARIO */}
            <div className="col-md-5">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white text-center">
                        <h5 className="mb-0">
                            {editId ? "Editar Persona" : "Registrar Persona"}
                        </h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="nombreCompleto"
                                    value={form.nombreCompleto}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Ej. Juan Pérez"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={form.correo}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Ej. juan@email.com"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={form.telefono}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Ej. 5551234567"
                                    required
                                />
                            </div>

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className={`btn ${editId ? "btn-warning" : "btn-success"}`}
                                >
                                    {editId ? "Actualizar" : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* TABLA */}
            <div className="col-md-7 mt-4 mt-md-0">
                <div className="card shadow-sm">
                    <div className="card-header bg-secondary text-white text-center">
                        <h5 className="mb-0">Lista de Personas</h5>
                    </div>
                    <div className="card-body table-responsive">
                        {personas.length === 0 ? (
                            <p className="text-center text-muted">No hay registros</p>
                        ) : (
                            <table className="table table-striped align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Teléfono</th>
                                        <th className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personas.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.nombreCompleto}</td>
                                            <td>{p.correo}</td>
                                            <td>{p.telefono}</td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => handleEdit(p)}
                                                    className="btn btn-sm btn-warning me-2"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonaCRUD;
