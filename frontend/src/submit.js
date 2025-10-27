// submit.js

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStore } from './store';
import { parsePipeline } from './services/api';
import { Alert } from './components/Alert';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const selector = (state) => ({
        nodes: state.nodes,
        edges: state.edges,
    });

    const { nodes, edges } = useStore(selector, shallow);

    const { mutate: submitPipeline, isPending } = useMutation({
        mutationFn: parsePipeline,
        onSuccess: (data) => {
            console.log('Pipeline parsed successfully:', data);
        },
        onError: (error) => {
            console.error('Pipeline parsing error:', error);
        },
    });

    const handleSubmit = () => {
        if (nodes.length === 0) {
            alert('Please add at least one node to the pipeline.');
            return;
        }

        submitPipeline(
            { nodes, edges },
            {
                onSuccess: (data) => {
                    setAlertData(data);
                    setShowAlert(true);

                    // Auto-hide alert after 5 seconds
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 5000);
                },
                onError: (error) => {
                    alert(`Error submitting pipeline: ${error.message}\n\nPlease make sure the backend is running.`);
                },
            }
        );
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}
            >
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPending || nodes.length === 0}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor:
                            isPending || nodes.length === 0 ? '#ccc' : '#2196F3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isPending || nodes.length === 0 ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s, transform 0.1s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                    onMouseDown={(e) => {
                        if (!isPending && nodes.length > 0) {
                            e.target.style.transform = 'scale(0.98)';
                        }
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    {isPending ? 'Processing...' : 'Submit Pipeline'}
                </button>
            </div>

            {showAlert && (
                <Alert
                    data={alertData}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </>
    );
};