// -------------------------------------------- Lancichinetti-Fortunato-Radicchi Benchmark --------------------------------------------

// [Description]
// Lancichinetti-Fortunato-Radicchi benchmark networks, try to better resemble real networks. This means that not only
// // they consider a power-law distribution of community sizes, but also a power-law distribution of node degrees. This
// // way, the user should input the corresponding exponents for each distribution. Due to this characteristic, Girvan-Newman
// // implementation needed to be adapted to conform with these requirements.

jLFR = function (zeta, gamma, N, mix_param, avg_deg) { // A function expression can be stored in a variable. After it has been
    // stored this way, it can be used as a function. Functions stored in variables do not need
    // names. They are always invoked using the variable name.

    // Global Variables
    let nodes = [];
    let edges = [];
    let result = {};
    let comm = [];
    let nodes_deg = [];
    let aux = 0;

    // Nodes Auxiliary Variables
    let prev = 0;
    let init = 0;

    // Edges Auxiliary Variables
    let edges_deg = [];

    // Defining minimum and maximum node degree.
    let k_min = 2;
    let k_max = Math.pow(10, (Math.log((-gamma+2)*avg_deg+Math.pow(k_min,(-gamma+2)))/(-gamma+2)));


    // ----------------------------------------- Helpers -----------------------------------------

    function random (prob) {
        return prob >= Math.random();
    }

    function powerDistribution (prob) {
        return prob >= Math.random();
    }

    // ----------------------------------------- Algorithm -----------------------------------------

    // Defining number and size of communities
    while(aux !== N) {

        let Nc = Math.round(Math.random() * (N-1)) + 1; // Considering k_min equals to 1.

        if (Math.random() < Nc ^ (-zeta)) {

            aux = aux + Math.round(Nc);

            if (aux > N) {
                aux = aux - Math.round(Nc);
            } else {
                comm.push(Math.round(Nc));
            }
        }
    }


    // Generating nodes
    for (let i = 0; i < comm.length; i++) {
        prev = prev + comm[i];
        for (let k = init; k < prev; k++) {
                nodes[k] = {id: k, group: i};
        }
        init = init + comm[i];
    }


    aux = 0;

    // Generating nodes degrees
    while(aux !== N) {

        let Nc = Math.round(Math.random() * (N-1)) + 1;

        if (Math.random() < Nc ^ (-gamma)) {

            aux = aux + Math.round(Nc);

            if (aux > N) {
                aux = aux - Math.round(Nc);
            } else {
                nodes_deg.push(Math.round(Nc));
            }
        }
    }


    result["nodes"] = nodes;
    result ["links"] = edges;

    return edges_deg;

};

module.exports = {
    jLFR: jLFR
};