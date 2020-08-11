usage() { echo "Usage: [-l link container by name source:alias] [-p Expose container on localhost port.]" 1>&2; exit 1; }

while getopts ":l:p:" o; do
    case "${o}" in
        l)
            l="--link ${OPTARG}"
            ;;
        p)
            p="-p ${OPTARG}:8083/tcp"
            ;;
        *)
	    usage
            ;;
    esac
done
shift $((OPTIND-1))

sudo docker build -t ursc:0.01 . && sudo docker run --detach --env-file ./config.conf --name ursc ${l} ${p} --rm -ti ursc:0.01 /bin/bash
