echo '$0:' $0
echo 'Script stored at:' ${0%/*}
cd "${0%/*}"

BASEDIR=$(pwd)
echo BASEDIR
bash ./local_api/Mac_ProjectStarter.command $BASE_DIR

